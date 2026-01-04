"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const logger_1 = require("./logger");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    //Server
    PORT: zod_1.z.string().default("5000"),
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    //Supabase
    DATABASE_URL: zod_1.z.string(),
    DIRECT_URL: zod_1.z.string(),
    // DATABASE_ANOM_KEY: z.string(),
    // URL: z.string(),
    //JWT
    JWT_SECRET: zod_1.z.string(),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    logger_1.log.error("❌ Invalid environment variables:", parsedEnv.error.format());
    throw new Error("Invalid environment variables");
}
exports.config = {
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
//# sourceMappingURL=envConfig.js.map