import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, getGoogleAccount, updateGoogleAccountToken } from "@/lib/db";

export const config: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: [
            "openid",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/youtube.readonly",
          ].join(" "),
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const googleAccount = await getGoogleAccount(user.id);
      if (googleAccount.expires_at ?? 0 * 1000 < Date.now()) {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID! as string,
              client_secret: process.env.AUTH_GOOGLE_SECRET! as string,
              grant_type: "refresh_token" as string,
              refresh_token: googleAccount.refresh_token as string,
            }),
          });
          const tokensOrError = await response.json();
          if (!response.ok) throw tokensOrError;
          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };
          await updateGoogleAccountToken(googleAccount.providerAccountId, googleAccount.refresh_token, newTokens);
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          session.error = "RefreshTokenError";
        }
      }
      return session;
    },
  },
};
