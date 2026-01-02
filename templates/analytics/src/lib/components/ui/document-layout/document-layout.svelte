<script lang="ts">
	import * as Sidebar from '../sidebar/index.js';
	import type { Snippet } from 'svelte';
	import { Separator } from '../separator';
	import CrumbPath from '../crumb-path/crumb-path.svelte';
	import AppSidebar from './app-sidebar.svelte';
	import NavTop from './nav-top.svelte';
	import NavRight from './nav-right.svelte';
	import ModeToggle from '../mode-toggle/mode-toggle.svelte';
	import User from '../user/user.svelte';

	interface Props {
		children: Snippet;
		icon: any;
		title: string;
		subline: string;
	}

	let { children, icon, title, subline }: Props = $props();
</script>

<Sidebar.Provider>
	<AppSidebar {icon} {title} {subline} />
	<Sidebar.Inset>
		<NavTop />
		<header
			class="sticky top-9 z-[10] flex h-16 shrink-0 items-center gap-2 bg-background lg:top-0"
		>
			<div class="flex w-full items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<CrumbPath />
				<div class="ml-auto flex items-center gap-2">
					<ModeToggle />
					<User />
				</div>
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
	<NavRight />
</Sidebar.Provider>
