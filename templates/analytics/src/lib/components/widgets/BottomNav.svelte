<script lang="ts">
	import { Home, BoltIcon, EqualApproximatelyIcon, PackageSearchIcon, BoxesIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import Drawer from './Drawer.svelte';
	import MobileFilter from './MobileFilter.svelte';

	const pathname = page.url.pathname;

	const isActiveRoute = (path: string) => pathname === path
</script>

<nav
	class="fixed bottom-0 left-0 right-0 z-[2] flex w-full items-center justify-between border-t bg-white dark:bg-secondary xl:hidden"
>
	<Button
		href="/"
		variant={isActiveRoute('/') ? 'outline' : 'ghost'}
		class={cn(
			'flex h-auto flex-col items-center gap-1 text-muted-foreground rounded-none border-none px-2',
			isActiveRoute('/') && 'text-primary dark:text-white'
		)}
	>
		<Home class="!size-5" />
		<span class="text-xs">About</span>
	</Button>
	<Button
		href="/scraper"
		variant={isActiveRoute('/scraper') ? 'outline' : 'ghost'}
		class={cn(
			'flex h-auto flex-col items-center gap-1 text-muted-foreground rounded-none border-none px-2',
			isActiveRoute('/scraper') && 'text-primary dark:text-white'
		)}
	>
		<PackageSearchIcon class="!size-5" />
		<span class="text-xs">Scraper</span>
	</Button>
	<Button
		href="/catalog"
		variant={isActiveRoute('/catalog') ? 'outline' : 'ghost'}
		class={cn(
			'flex h-auto flex-col items-center gap-1 text-muted-foreground rounded-none border-none px-2',
			isActiveRoute('/catalog') && 'text-primary dark:text-white'
		)}
	>
		<BoxesIcon class="!size-5" />
		<span class="text-xs">Catalog</span>
	</Button>
	<MobileFilter />
	<Drawer />
</nav>
