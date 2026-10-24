import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin-auth";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET is missing or too short");
  }

  return secret;
}

function createSignature(expiresAt: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(expiresAt)
    .digest("base64url");
}

export function createAdminSessionToken(): string {
  const expiresAt = String(
    Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  );

  return `${expiresAt}.${createSignature(expiresAt)}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const [expiresAt, signature, extra] = token.split(".");

  if (!expiresAt || !signature || extra !== undefined) {
    return false;
  }

  const expiration = Number(expiresAt);

  if (!Number.isSafeInteger(expiration) || expiration <= Date.now() / 1000) {
    return false;
  }

  try {
    const expectedSignature = createSignature(expiresAt);
    const received = Buffer.from(signature, "base64url");
    const expected = Buffer.from(expectedSignature, "base64url");

    if (received.length !== expected.length) {
      return false;
    }

    return timingSafeEqual(received, expected);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();

  return verifyAdminSessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export const ADMIN_SESSION_COOKIE = COOKIE_NAME;
export const ADMIN_SESSION_MAX_AGE = SESSION_DURATION_SECONDS;
