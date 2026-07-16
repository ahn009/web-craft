import crypto from "node:crypto";
import { env } from "../config/env.config.js";

const ENCRYPTION_VERSION = "v1";
const IV_BYTES = 12;
const KEY_BYTES = 32;

export function normalizeEncryptionKey(value: string): Buffer {
  const trimmed = value.trim();

  if (/^[a-f0-9]{64}$/i.test(trimmed)) {
    return Buffer.from(trimmed, "hex");
  }

  const base64 = Buffer.from(trimmed, "base64");
  if (base64.length === KEY_BYTES) {
    return base64;
  }

  const utf8 = Buffer.from(trimmed, "utf8");
  if (utf8.length === KEY_BYTES) {
    return utf8;
  }

  throw new Error("Credential encryption key must decode to exactly 32 bytes");
}

export function encryptSecret(plaintext: string, keyValue = env.CREDENTIAL_ENCRYPTION_KEY): string {
  const key = normalizeEncryptionKey(keyValue);
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    ENCRYPTION_VERSION,
    iv.toString("base64url"),
    tag.toString("base64url"),
    ciphertext.toString("base64url"),
  ].join(":");
}

export function decryptSecret(payload: string, keyValue = env.CREDENTIAL_ENCRYPTION_KEY): string {
  const [version, ivValue, tagValue, ciphertextValue] = payload.split(":");
  if (version !== ENCRYPTION_VERSION || !ivValue || !tagValue || !ciphertextValue) {
    throw new Error("Unsupported encrypted payload format");
  }

  const key = normalizeEncryptionKey(keyValue);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(ivValue, "base64url"));
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
