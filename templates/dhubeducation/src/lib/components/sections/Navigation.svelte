<script lang="ts">
	import { Button } from '../ui/button';
	import type { iRoute, iUser } from '$lib/interface';
	import { purify } from '@toolsntuts/utils';
	import { page } from '$app/state';
	import { getContext } from 'svelte';
	import { Role } from '$lib/constants';

	const me = getContext('me') as iUser;

	const navLinks: iRoute[] = [
		{
			name: 'Home',
			href: '/',
			isAuthorized: true
		},
		{
			name: 'About',
			href: '/about',
			isAuthorized: true
		},
		{
			name: 'Services',
			href: '/services',
			isAuthorized: true
		},
		{
			name: 'Courses',
			href: '/courses',
			isAuthorized: true
		},
		{
			name: 'Finance',
			href: '/finance',
			isAuthorized: true
		},
		{
			name: 'Referral',
			href: '/referral-program',
			isAuthorized: true
		},
		{
			name: 'Admin',
			href: '/admin',
			isAuthorized: me && me.role === Role.ADMIN
		}
	];

	const isCurrentPage = (href: string) => purify(href) === purify(page.url.pathname);
</script>

<div class="hidden items-center gap-2 lg:flex">
	{#each navLinks as { name, href, isAuthorized } (href)}
		{#if isAuthorized}
			<Button {href} variant={isCurrentPage(href) ? 'outline' : 'default'} class="rounded-full"
				>{name}</Button
			>
		{/if}
	{/each}
</div>
