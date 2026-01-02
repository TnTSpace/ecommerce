<script lang="ts" module>
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Bot from '@lucide/svelte/icons/bot';
	import ChartPie from '@lucide/svelte/icons/chart-pie';
	import Frame from '@lucide/svelte/icons/frame';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import Map from '@lucide/svelte/icons/map';
	import Send from '@lucide/svelte/icons/send';
	import Settings2 from '@lucide/svelte/icons/settings-2';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';

	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: 'https://next.shadcn-svelte.com/avatars/shadcn.jpg'
		},
		navMain: [
			{
				title: 'Playground',
				url: '#',
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: 'History',
						url: '#'
					},
					{
						title: 'Starred',
						url: '#'
					},
					{
						title: 'Settings',
						url: '#'
					}
				]
			},
			{
				title: 'Models',
				url: '#',
				icon: Bot,
				items: [
					{
						title: 'Genesis',
						url: '#'
					},
					{
						title: 'Explorer',
						url: '#'
					},
					{
						title: 'Quantum',
						url: '#'
					}
				]
			},
			{
				title: 'Documentation',
				url: '#',
				icon: BookOpen,
				items: [
					{
						title: 'Introduction',
						url: '#'
					},
					{
						title: 'Get Started',
						url: '#'
					},
					{
						title: 'Tutorials',
						url: '#'
					},
					{
						title: 'Changelog',
						url: '#'
					}
				]
			},
			{
				title: 'Settings',
				url: '#',
				icon: Settings2,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
					{
						title: 'Billing',
						url: '#'
					},
					{
						title: 'Limits',
						url: '#'
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Support',
				url: '#',
				icon: LifeBuoy
			},
			{
				title: 'Feedback',
				url: '#',
				icon: Send
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: Frame
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPie
			},
			{
				name: 'Travel',
				url: '#',
				icon: Map
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import * as Sidebar from '../sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import NavLinks from './nav-links.svelte';

	interface Props extends ComponentProps<typeof Sidebar.Root> {
		icon: any;
		title: string;
		subline: string;
	}

	let { ref = $bindable(null), icon, title, subline, ...restProps }: Props = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							{@render LogoIcon(icon, title, subline)}
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavLinks>
			{@render LogoIcon(icon, title, subline)}
		</NavLinks>
	</Sidebar.Footer>
</Sidebar.Root>

{#snippet LogoIcon(icon: any, title: string, subline: string)}
	{@const Icon = icon}
	<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary">
		<Icon class="size-4" />
	</div>
	<div class="grid flex-1 text-left text-sm leading-tight">
		<span class="truncate font-semibold">{title}</span>
		<span class="truncate text-xs">{subline}</span>
	</div>
{/snippet}
