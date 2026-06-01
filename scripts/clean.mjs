import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const TARGETS = [".next", "node_modules/.cache"];

function killNodeOnPorts() {
  if (process.platform !== "win32") return;
  try {
    execSync("taskkill /F /IM node.exe 2>nul", { stdio: "ignore" });
  } catch {
    /* no node running */
  }
}

killNodeOnPorts();

for (const name of TARGETS) {
  const target = path.join(ROOT, name);
  if (!fs.existsSync(target)) continue;
  try {
    fs.rmSync(target, {
      recursive: true,
      force: true,
      maxRetries: 15,
      retryDelay: 400,
    });
    console.log(`Removed ${name}`);
  } catch (err) {
    console.error(
      `Failed to remove ${name}. Tutup semua terminal "npm run dev", lalu jalankan lagi: npm run clean`,
    );
    console.error(err.message);
    process.exit(1);
  }
}

console.log("Cache cleared. Jalankan: npm run dev");
