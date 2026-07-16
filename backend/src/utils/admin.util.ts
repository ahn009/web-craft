import { env } from "../config/env.config.js";

export function isAdminEmail(email: string | undefined) {
  return email?.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
}
