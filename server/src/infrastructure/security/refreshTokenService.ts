import bcrypt from 'bcrypt';
import crypto from 'crypto';

const BYTES = Number(process.env.REFRESH_TOKEN_BYTES ?? 64);
const SALT_ROUNDS = Number(process.env.REFRESH_TOKEN_HASH_SALT_ROUNDS ?? 10);

export function generateRefreshTokenPlain(): string {
  return crypto.randomBytes(BYTES).toString("hex");
}

export async function hashRefreshToken(token: string): Promise<string> {
  return bcrypt.hash(token, SALT_ROUNDS);
}

export async function compareRefreshToken(token: string, hash: string): Promise<boolean> {
  return bcrypt.compare(token, hash);
}