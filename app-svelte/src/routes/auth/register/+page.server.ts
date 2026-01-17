import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createServerPb, savePbAuthCookie } from '$lib/server/pocketbase';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;

		if (!email || !password || !passwordConfirm) {
			return fail(400, { error: 'All fields are required' });
		}

		if (password !== passwordConfirm) {
			return fail(400, { error: 'Passwords do not match', email });
		}

		const pb = createServerPb();

		try {
			// Create the user
			await pb.collection('users').create({
				email,
				password,
				passwordConfirm
			});

			// Log them in automatically
			await pb.collection('users').authWithPassword(email, password);

			savePbAuthCookie({ cookies } as any, pb);

			throw redirect(303, '/');
		} catch (error: any) {
			if (error?.status === 303) {
				throw error;
			}
			console.error('Registration error:', error);
			return fail(400, {
				error: error?.message || 'Failed to create account',
				email
			});
		}
	}
} satisfies Actions;
