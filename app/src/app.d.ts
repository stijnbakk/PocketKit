import type { PbUser } from '$lib/server/pocketbase';

declare global {
	namespace App {
		interface Locals {
			pbUser: PbUser | null;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
