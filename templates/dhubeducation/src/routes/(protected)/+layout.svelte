<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/sections/AppSidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import type { iService, iUser } from '$lib/interface';
	import BreadcrumbComponent from '$lib/components/widgets/BreadcrumbComponent.svelte';

	import CustomDialog from '$lib/components/widgets/CustomDialog.svelte';
	import ModeToggle from '$lib/components/widgets/ModeToggle.svelte';
	import BottomNav from '$lib/components/widgets/BottomNav.svelte';
	import User from '$lib/components/widgets/User.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let me = data.me as iUser;
	let services = data.services;
	let blogs = data.blogs;

	setContext('me', me);
	setContext('services', services);
	setContext('blogs', blogs);
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset class="bg-[#f5f5f5] pb-14 dark:bg-background">
		<header
			class="sticky left-0 top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<BreadcrumbComponent />
			</div>
			<div class="flex items-center gap-2 mr-4">
				<ModeToggle />
				<User />
			</div>
		</header>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
<CustomDialog />
<BottomNav />
