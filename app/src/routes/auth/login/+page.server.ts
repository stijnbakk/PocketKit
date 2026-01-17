import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createServerPb, savePbAuthCookie } from '$lib/server/pocketbase';

export const actions = {
	default: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		const pb = createServerPb();

		try {
			console.log('Attempting to authenticate user:', email);
			console.log('PocketBase URL:', pb.baseUrl);

			const authData = await pb.collection('users').authWithPassword(email, password);

			console.log('Authentication successful for user:', authData.record?.email);
			savePbAuthCookie({ cookies } as any, pb);

			throw redirect(303, '/');
		} catch (error: any) {
			if (error?.status === 303) {
				throw error;
			}
			console.error('Login error details:', {
				message: error?.message,
				status: error?.status,
				response: error?.response,
				url: error?.url
			});

			// Provide more specific error message
			let errorMessage = 'Invalid email or password';
			if (error?.response?.message) {
				errorMessage = error.response.message;
			}

			return fail(400, {
				error: errorMessage,
				email
			} as const);
		}
	}
} satisfies Actions;
