import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

async function runMigrationsUp() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const migrationsDir = path.join(__dirname, '..', 'migrations');

    const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.up.sql'));
    files.sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');
      console.log(`Running migration: ${file}`);
      await pool.query(sql);
    }

    console.log('Migrations UP completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrationsUp();
