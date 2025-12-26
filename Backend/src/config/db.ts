import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";  
import { config } from "./envConfig";
// connect to postgres database so that the prisma client will not take load on serverless servers
const pool = new Pool({ connectionString: config.supabase.url });
// create adapter to connect prisma to postgres
const adapter = new PrismaPg(pool);
// create prisma client with adapter so that 
const prisma = new PrismaClient({ adapter });

export default prisma;
