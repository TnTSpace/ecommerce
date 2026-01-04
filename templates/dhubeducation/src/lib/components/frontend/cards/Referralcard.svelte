<script lang="ts">
	import type { iReferral, iUser } from '$lib/interface';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRightIcon, UserPlusIcon } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { Constants } from '$lib/constants';
	interface Props {
		referral: iReferral;
	}

	let { referral }: Props = $props();

	const src = `${referral.landscapepic}?w=480;1024;1920&format=webp&as=srcset`;

	const href = `/referral-program/${referral.slug}`;

	const me = getContext('me') as iUser;

	const onclick = () => {
		localStorage.setItem(Constants.REDIRECT, "/referral")
	}
</script>

<div
	aria-label={referral.type}
	class="flex flex-col gap-2 space-y-2 overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary"
>
	<Button
		{href}
		aria-label={referral.type}
		class="aspect-video h-auto overflow-hidden object-cover p-0 hover:bg-transparent"
	>
		<img {src} loading="lazy" alt={referral.type} class="h-full w-full" />
	</Button>
	<div class="flex flex-col space-y-1 p-4 pt-0 text-start">
		<h2 class="sub-title line-clamp-1 w-full font-semibold">
			{referral.type}
		</h2>
		<p class="line-clamp-2 w-full text-muted-foreground">{referral.caption}</p>
	</div>
	<div class="flex items-center justify-center gap-2">
		<Button {href} variant="link" class="items-center">
			<span>Read</span>
			<ChevronRightIcon class="size-4" />
		</Button>

		{#if me}
			<Button href="/referral" variant="link" class="items-center">
				<UserPlusIcon class="size-4" />
				<span>Dashboard</span>
			</Button>
		{:else}
			<Button {onclick} href="/referral" variant="link" class="items-center">
				<UserPlusIcon class="size-4" />
				<span>Sign Up</span>
			</Button>
		{/if}
	</div>
</div>
