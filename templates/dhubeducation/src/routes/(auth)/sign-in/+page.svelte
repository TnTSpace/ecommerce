<script lang="ts">
	import { SignIn, ClerkLoading, ClerkLoaded } from 'svelte-clerk';
	import { mode } from 'mode-watcher';
	import { dark } from '@clerk/themes';
	import { page } from '$app/state';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';

	let baseTheme = $derived($mode === 'dark' ? [dark] : []);
	let variables = $state(
		$mode === 'dark'
			? {
					colorPrimary: '#a63390',
					colorBackground: '#210a1d',
					colorTextOnPrimaryBackground: '#fff'
				}
			: {}
	);

	const redirectUrl = $state(page.url.searchParams.get('redirect') as string)
</script>

<div class="flex flex-col items-center justify-center">
	<ClerkLoading>
		<SpinLoader class="size-16" />
	</ClerkLoading>
	<ClerkLoaded>
		<SignIn
			fallbackRedirectUrl={redirectUrl}
			appearance={{
				baseTheme,
				variables,
				layout: {
					logoImageUrl: '/favicon.svg'
				}
			}}
		/>
	</ClerkLoaded>
</div>
