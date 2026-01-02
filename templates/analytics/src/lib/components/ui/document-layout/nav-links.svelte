<script lang="ts" module>
	let defaultRoutes: iRoute[] = [
		{
			href: '/about',
			name: 'About',
			icon: RssIcon
		},
		{
			href: '/blogs',
			name: 'Blogs',
			icon: RssIcon
		},
		{
			href: '/legals',
			name: 'Legals',
			icon: BriefcaseIcon
		},
		{
			href: '/contact',
			name: 'Contact Us',
			icon: PhoneIcon
		}
	];
</script>

<script lang="ts">
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import * as DropdownMenu from '../dropdown-menu/index.js';
	import * as Sidebar from '../sidebar/index.js';
	import { useSidebar } from '../sidebar/index.js';
	import type { Snippet } from 'svelte';
	import { HomeIcon, RssIcon, BriefcaseIcon, PhoneIcon } from 'lucide-svelte';
	import type { iRoute } from '../../../interface/index';

	interface Props {
		children: Snippet;
		routes?: iRoute[];
	}
	let { children, routes = defaultRoutes }: Props = $props();

	const sidebar = useSidebar();

	const navigateToUrl = (url: string) => (location.href = url);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						{@render children()}
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						{@render children()}
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item onclick={() => navigateToUrl('/')}>
						<HomeIcon />
						Home
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					{#each routes as { name, href, icon }, i}
						{@const Icon = icon}
						<DropdownMenu.Item onclick={() => navigateToUrl(href)}>
							<Icon />
							{name}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
