<script lang="ts">
	import { Home, BoltIcon, EqualApproximatelyIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import Drawer from './Drawer.svelte';

	const pathname = page.url.pathname;

	const isActiveRoute = (path: string) => path === '/' ? (pathname === path) : pathname.includes(path)
</script>

<nav
	class="fixed bottom-0 left-0 right-0 grid w-full grid-cols-4 border-t bg-white dark:bg-secondary lg:hidden z-[2]"
>
	<Button
		href="/"
		variant={isActiveRoute('/') ? 'outline' : 'ghost'}
		class={cn("flex h-auto flex-col items-center gap-1 text-muted-foreground", isActiveRoute('/') && "text-primary dark:text-white")}
	>
		<Home class="!size-5" />
		<span class="text-xs">Home</span>
	</Button>
	<Button
		href="/about"
		variant={isActiveRoute('/about') ? 'outline' : 'ghost'}
		class={cn("flex h-auto flex-col items-center gap-1 text-muted-foreground", isActiveRoute('/about') && "text-primary dark:text-white")}
	>
		<EqualApproximatelyIcon class="!size-5" />
		<span class="text-xs">About</span>
	</Button>
	<Button
		href="/services"
		variant={isActiveRoute('/services') ? 'outline' : 'ghost'}
		class={cn("flex h-auto flex-col items-center gap-1 text-muted-foreground", isActiveRoute('/services') && "text-primary dark:text-white")}
	>
		<BoltIcon class="!size-5" />
		<span class="text-xs">Services</span>
	</Button>
	<Drawer />
</nav>
