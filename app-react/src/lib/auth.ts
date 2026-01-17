import { cookies } from 'next/headers';
import { createServerPb, type PbUser } from './pocketbase';
import PocketBase from 'pocketbase';

export const pbCookieName = 'pb_auth';

/**
 * Gets the PocketBase auth cookie value from the request.
 */
export async function getPbAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(pbCookieName)?.value;
}

/**
 * Creates a PocketBase instance with auth loaded from cookies.
 */
export async function createServerPbWithAuth() {
  const pb = createServerPb();
  const cookie = await getPbAuthCookie();

  if (cookie) {
    // loadFromCookie expects the format: "pb_auth=<value>"
    pb.authStore.loadFromCookie(`${pbCookieName}=${cookie}`);
  }

  return pb;
}

/**
 * Validates the current auth state and refreshes if needed.
 * Returns the user record if valid, null otherwise.
 */
export async function validatePbAuth(pb: PocketBase): Promise<PbUser | null> {
  if (!pb.authStore.isValid) {
    return null;
  }

  try {
    // Refresh the auth to ensure it's still valid
    await pb.collection('users').authRefresh();
    const record = pb.authStore.record;

    if (!record) {
      return null;
    }

    return {
      id: record.id,
      email: record.email as string,
      username: record.username as string | undefined,
      verified: record.verified as boolean,
      created: record.created as string,
      updated: record.updated as string,
    };
  } catch {
    // Auth is invalid, clear it
    pb.authStore.clear();
    return null;
  }
}

/**
 * Saves the PocketBase auth state to a cookie.
 */
export async function savePbAuthCookie(pb: PocketBase) {
  const cookieStore = await cookies();

  // exportToCookie returns: "pb_auth=<encoded_value>; Path=/; ..."
  // We need to extract just the value part
  const exportedCookie = pb.authStore.exportToCookie();
  const match = exportedCookie.match(/^pb_auth=([^;]+)/);

  if (match && match[1]) {
    cookieStore.set(pbCookieName, match[1], {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }
}

/**
 * Clears the PocketBase auth cookie.
 */
export async function clearPbAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(pbCookieName);
}

/**
 * Gets the current authenticated user from cookies.
 * This is useful for server components and API routes.
 */
export async function getCurrentUser(): Promise<PbUser | null> {
  const pb = await createServerPbWithAuth();
  return await validatePbAuth(pb);
}
