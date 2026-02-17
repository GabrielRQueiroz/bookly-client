import 'server-only' 

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { generateSeed } from './seed';

const dbPath = path.join(process.cwd(), 'lib/mocks/db.json');

async function fileExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDbExists() {
  const exists = await fileExists(dbPath);

  if (!exists) {
    const seed = generateSeed();
    await fs.writeFile(dbPath, JSON.stringify(seed, null, 2));
  }
}

export async function readDb() {
  if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
    throw new Error('Mock desativado');
  }

  await ensureDbExists();

  const file = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(file);
}

export async function writeDb(data: any) {
  if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
    throw new Error('Mock desativado');
  }

  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}
