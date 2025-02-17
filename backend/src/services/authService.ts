import pool from '../db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js';

const SALT_ROUNDS = 10;

export async function register(username: string, password: string) {
  const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (existingUser.rows.length > 0) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, hashedPassword]
  );
  return result.rows[0];
}

export async function login(username: string, password: string) {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (result.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id, username: user.username });
  return token;
}
