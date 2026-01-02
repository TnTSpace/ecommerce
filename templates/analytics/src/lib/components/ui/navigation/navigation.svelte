<script module>
	let defaultLinks: iRoute[] = [
		{
			name: 'home',
			href: '/',
			isAuthorized: true
		},
		{
			name: 'admin',
			href: '/admin',
			isAuthorized: true
		},
		{
			name: 'about',
			href: '/about',
			isAuthorized: true
		},
		{
			name: 'blogs',
			href: '/blogs',
			isAuthorized: true
		}
	];
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '../../../utils/index';
	import { getContext } from 'svelte';
	import type { iRoute, iUser } from '../../../interface/index';
	import { Role } from '../../../constants/index';
	import { Button } from '../button';

	interface Props {
		class?: string;
		links?: iRoute[];
	}

	const me = getContext('me') as iUser;

	let { class: className, links = defaultLinks }: Props = $props();

	$effect(() => {
		const condition = me && me.role === Role.ADMIN;
		console.log({ condition, me });
	});

	let isAuthorized = $derived(me && me.role === Role.ADMIN);

	const pathname = page.url.pathname;
	const isActiveRoute = (path: string) => pathname === path;
</script>

<div class={cn('flex gap-2', className)}>
	{#each links as { href, name, isAuthorized }, i}
		{#if isAuthorized}
			<Button
				{href}
				class="rounded-full capitalize"
				variant={isActiveRoute(href) ? 'default' : 'outline'}
			>
				{name}
			</Button>
		{/if}
	{/each}
</div>
