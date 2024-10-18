import { accounts, and, db, eq } from "@/lib/db";

export const getGoogleAccount = async (id: string) => {
  const [googleAccount] = await db
    .select()
    .from(accounts)
    .where(and(eq(accounts.userId, id), eq(accounts.provider, "google")))
    .limit(1);
  return googleAccount;
};

export type Tokens = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
};

export const updateGoogleAccountToken = async (providerAccountId: string, refresh_token: string | null, tokens: Tokens) => {
  await db
    .update(accounts)
    .set({
      access_token: tokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refresh_token: tokens.refresh_token ?? refresh_token,
    })
    .where(and(eq(accounts.provider, "google"), eq(accounts.providerAccountId, providerAccountId)));
};

export const getUserById = async (id: string) => {
  const [user] = await db.select().from(accounts).where(eq(accounts.userId, id)).limit(1);
  return user;
};
