import dotenv from "dotenv";
import { z } from "zod";
import { log } from "./logger";

dotenv.config();

const envSchema = z.object({
  //Server
  PORT: z.string().default("5000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  //Supabase
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  // DATABASE_ANOM_KEY: z.string(),
  // URL: z.string(),
  //JWT
  JWT_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  log.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const config = {
  server: {
    port: parsedEnv.data.PORT,
    nodeEnv: parsedEnv.data.NODE_ENV,
  },
  neon: {
    url: parsedEnv.data.DATABASE_URL,
    directUrl: parsedEnv.data.DIRECT_URL,
    // anonKey: parsedEnv.data.DATABASE_ANOM_KEY,
    // supabaseUrl: parsedEnv.data.URL,
  },
  jwt: {
    secret: parsedEnv.data.JWT_SECRET,
  },
};
