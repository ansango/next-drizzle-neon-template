import NextAuth from "next-auth";
import { config } from "@/lib/auth/config";

export const { handlers, signIn, signOut, auth } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
  }
}
