import type { Handle } from '@sveltejs/kit';
import {
	createServerPbWithAuth,
	validatePbAuth,
	savePbAuthCookie,
	clearPbAuthCookie,
	type PbUser
} from '$lib/server/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	const pb = createServerPbWithAuth(event);
	const user = await validatePbAuth(pb);

	if (user) {
		event.locals.pbUser = {
			id: user.id,
			email: user.email as string,
			username: user.username as string | undefined,
			verified: user.verified as boolean,
			created: user.created as string,
			updated: user.updated as string
		} satisfies PbUser;
		savePbAuthCookie(event, pb);
	} else {
		event.locals.pbUser = null;
		clearPbAuthCookie(event);
	}

	return resolve(event);
};
