/**
 * Run SQL migration against DATABASE_URL from .env.local
 * Usage: npm run db:migrate
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const sqlPath = join(root, "supabase", "migrations", "001_initial_schema.sql");
const envPath = join(root, ".env.local");

function loadEnvLocal() {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Set DATABASE_URL in .env.local");
  process.exit(1);
}

const sql = readFileSync(sqlPath, "utf8");

try {
  const { default: pg } = await import("pg");
  const client = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Migration applied successfully.");
} catch (e) {
  if (e.code === "ERR_MODULE_NOT_FOUND") {
    console.error("Install pg first: npm install -D pg");
    console.log("\nOr paste SQL in Supabase Dashboard → SQL Editor:\n", sqlPath);
    process.exit(1);
  }
  console.error("Migration failed:", e.message);
  process.exit(1);
}
