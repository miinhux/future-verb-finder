import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_FILE = path.join(ROOT, 'data', 'careernet-jobs.json');
const DIST_DIR = path.join(ROOT, 'dist');

await fs.rm(DIST_DIR, { recursive: true, force: true });
await fs.mkdir(DIST_DIR, { recursive: true });
await fs.cp(PUBLIC_DIR, DIST_DIR, { recursive: true });
await fs.mkdir(path.join(DIST_DIR, 'data'), { recursive: true });
await fs.copyFile(DATA_FILE, path.join(DIST_DIR, 'data', 'careernet-jobs.json'));
await fs.writeFile(path.join(DIST_DIR, '.nojekyll'), '', 'utf8');

console.log('Static site built in dist/.');
