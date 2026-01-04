<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import { Button } from '../ui/button';
	import type { iUser } from '$lib/interface';
	import { Role } from '$lib/constants';

	interface Props {
		class?: string;
	}

	const me = getContext('me') as iUser;

	let { class: className }: Props = $props();

	$effect(() => {
		const condition = me && me.role === Role.ADMIN
		console.log({ condition, me })
	})

	let isAuthorized = $derived(me && me.role === Role.ADMIN)

	const pathname = page.url.pathname;
	const isActiveRoute = (path: string) => pathname === path;
</script>

<div class={cn('flex', className)}>
	{#if isAuthorized}
		<Button
			class="rounded-full"
			href="/admin"
			variant={isActiveRoute('/admin') ? 'default' : 'outline'}
		>
			Admin
		</Button>
	{/if}
	<Button class="rounded-full" href="/" variant={isActiveRoute('/') ? 'default' : 'outline'}
		>Home</Button
	>
	<Button
		class="rounded-full"
		href="/about"
		variant={isActiveRoute('/about') ? 'default' : 'outline'}
		>About
	</Button>
	<Button
		class="rounded-full"
		href="/services"
		variant={isActiveRoute('/services') ? 'default' : 'outline'}
	>
		Services
	</Button>
	<Button
		class="rounded-full"
		href="/courses"
		variant={isActiveRoute('/courses') ? 'default' : 'outline'}
	>
		Courses
	</Button>
	<Button
		class="rounded-full"
		href="/referral-program"
		variant={isActiveRoute('/referral-program') ? 'default' : 'outline'}
	>
		Referral Program
	</Button>
	<Button
		class="rounded-full"
		href="/referral"
		variant={isActiveRoute('/referral') ? 'default' : 'outline'}
	>
		Refer Someone
	</Button>
	<Button
		class="rounded-full"
		href="/finance"
		variant={isActiveRoute('/finance') ? 'default' : 'outline'}
	>
		Finance
	</Button>
	<Button
		class="rounded-full"
		href="/blogs"
		variant={isActiveRoute('/blog') ? 'default' : 'outline'}
	>
		Blogs
	</Button>
	<!-- <Button
		class="rounded-full"
		href="/contact"
		variant={isActiveRoute('/contact') ? 'default' : 'outline'}
	>
		Contact Us
	</Button> -->
</div>
