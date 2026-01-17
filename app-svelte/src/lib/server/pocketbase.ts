import PocketBase from 'pocketbase';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const POCKETBASE_URL = env.PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pbCookieName = 'pb_auth';

/**
 * Creates a new PocketBase instance for server-side use.
 * Each request should get its own instance to avoid auth state conflicts.
 */
export function createServerPb() {
	return new PocketBase(POCKETBASE_URL);
}

/**
 * Creates a PocketBase instance and loads the auth state from cookies.
 */
export function createServerPbWithAuth(event: RequestEvent) {
	const pb = createServerPb();
	const cookie = event.cookies.get(pbCookieName);

	if (cookie) {
		// loadFromCookie expects the format: "pb_auth=<value>"
		pb.authStore.loadFromCookie(`${pbCookieName}=${cookie}`);
	}

	return pb;
}

/**
 * Saves the PocketBase auth state to a cookie.
 */
export function savePbAuthCookie(event: RequestEvent, pb: PocketBase) {
	// exportToCookie returns: "pb_auth=<encoded_value>; Path=/; ..."
	// We need to extract just the value part for SvelteKit's cookies.set()
	const exportedCookie = pb.authStore.exportToCookie();
	const match = exportedCookie.match(/^pb_auth=([^;]+)/);

	if (match && match[1]) {
		event.cookies.set(pbCookieName, match[1], {
			httpOnly: true,
			secure: import.meta.env.PROD,
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});
	}
}

/**
 * Clears the PocketBase auth cookie.
 */
export function clearPbAuthCookie(event: RequestEvent) {
	event.cookies.delete(pbCookieName, { path: '/' });
}

/**
 * Validates the current auth state and refreshes if needed.
 * Returns the user record if valid, null otherwise.
 */
export async function validatePbAuth(pb: PocketBase) {
	if (!pb.authStore.isValid) {
		return null;
	}

	try {
		// Refresh the auth to ensure it's still valid
		await pb.collection('users').authRefresh();
		return pb.authStore.record;
	} catch {
		// Auth is invalid, clear it
		pb.authStore.clear();
		return null;
	}
}

export type PbUser = {
	id: string;
	email: string;
	username?: string;
	verified: boolean;
	created: string;
	updated: string;
};
