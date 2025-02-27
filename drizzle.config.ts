import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.TURSO_DATABASE_URL) {
    throw new Error("TURSO_DATABASE_URL not set");
}

if (!process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_AUTH_TOKEN not set");
}

export default defineConfig({
    out: "src/db/migrations",
    schema: "src/db/schema.ts",
    dialect: "turso",
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
});
