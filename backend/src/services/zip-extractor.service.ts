import AdmZip from "adm-zip";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import path from "path";

const AGENTS_DIR = path.resolve("data/agents");

export function getAgentsDir() {
  return AGENTS_DIR;
}

export function hasExtractedFiles(): boolean {
  if (!existsSync(AGENTS_DIR)) return false;
  const files = readdirSync(AGENTS_DIR).filter((f) => f.endsWith(".json"));
  return files.length > 0;
}

export function extractZip(zipPath: string): number {
  const resolvedPath = path.resolve(zipPath);
  if (!existsSync(resolvedPath)) {
    throw new Error(`ZIP file not found at ${resolvedPath}`);
  }

  mkdirSync(AGENTS_DIR, { recursive: true });

  const zip = new AdmZip(resolvedPath);
  const entries = zip.getEntries();
  let count = 0;

  for (const entry of entries) {
    if (entry.isDirectory) continue;
    if (!entry.entryName.endsWith(".json")) continue;

    const fileName = path.basename(entry.entryName);
    const outputPath = path.join(AGENTS_DIR, fileName);
    writeFileSync(outputPath, entry.getData());
    count++;
  }

  return count;
}
