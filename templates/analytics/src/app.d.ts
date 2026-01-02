// See https://svelte.dev/docs/kit/types#app.d.ts

import type { iGoogleUser } from "$lib/interface";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
  interface Locals {
    user: iGoogleUser | null;
    redirect: string;
  }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
declare var gapi: typeof gapi;

export {};
