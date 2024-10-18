import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
export * from "drizzle-orm";
import * as schema from "./schema";
export * from "./schema";
export * from "./queries";
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
