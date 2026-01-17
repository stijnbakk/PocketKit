import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

/**
 * Client-side PocketBase instance.
 * This is shared across the client application.
 */
export const pb = new PocketBase(POCKETBASE_URL);

/**
 * Creates a new PocketBase instance for server-side use.
 * Each request should get its own instance to avoid auth state conflicts.
 */
export function createServerPb() {
  return new PocketBase(POCKETBASE_URL);
}

export type PbUser = {
  id: string;
  email: string;
  username?: string;
  verified: boolean;
  created: string;
  updated: string;
};
