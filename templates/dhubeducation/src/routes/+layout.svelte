<script lang="ts">
	import '../app.css';
	import { ClerkProvider } from 'svelte-clerk';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import WhatsAppBtn from '$lib/components/widgets/WhatsAppBtn.svelte';
	import CookieConsentBtn from '$lib/components/widgets/CookieConsentBtn.svelte';
	
	let { children } = $props();

</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	<div>
		{@render children()}
	</div>
	<ModeWatcher />
	<Toaster richColors position="top-center" />
	<WhatsAppBtn />
	<CookieConsentBtn />
</ClerkProvider>
