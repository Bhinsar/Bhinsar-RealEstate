import { defineConfig, env } from "@prisma/config";
import { config } from "./src/config/envConfig";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: config.neon.directUrl,
  },
});
