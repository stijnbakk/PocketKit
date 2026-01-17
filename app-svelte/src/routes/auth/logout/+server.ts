import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clearPbAuthCookie } from '$lib/server/pocketbase';

export const POST: RequestHandler = async ({ cookies }) => {
	clearPbAuthCookie({ cookies } as any);
	throw redirect(303, '/auth/login');
};
