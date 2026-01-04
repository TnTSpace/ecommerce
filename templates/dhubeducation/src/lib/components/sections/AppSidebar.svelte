<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { getContext } from 'svelte';
	import {
		SettingsIcon,
		StoreIcon,
		BoxIcon,
		RssIcon,
		HouseIcon,
		BookOpenCheckIcon,
		CircleHelpIcon,
		MegaphoneIcon,
		HandshakeIcon,
		UsersIcon
	} from 'lucide-svelte';
	import type { iRoute, iUser } from '$lib/interface';
	import { page } from '$app/state';
	import Brand from '$lib/components/sections/Brand.svelte';
	import { Role } from '$lib/constants';

	let me = getContext('me') as iUser;

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	let routes: iRoute[] = [
		{
			name: 'Overview',
			href: `/admin`,
			icon: StoreIcon,
			isAuthorized: me.role === Role.ADMIN
		},
		{
			name: 'Homepage',
			href: `/admin/homepage`,
			icon: HouseIcon,
			isAuthorized: me.role === Role.ADMIN
		},
		{
			name: 'Services',
			href: `/admin/services`,
			icon: BoxIcon,
			isAuthorized: me.role === Role.ADMIN
		},
		{
			name: 'Courses',
			href: `/admin/courses`,
			icon: BookOpenCheckIcon,
			isAuthorized: me.role === Role.ADMIN
		},
		{
			name: 'Campaigns',
			href: `/admin/campaigns`,
			icon: MegaphoneIcon,
			isAuthorized: me.role === Role.ADMIN
		},
		{
			name: 'Partners',
			href: `/admin/partners`,
			isAuthorized: me.role === Role.ADMIN,
			icon: HandshakeIcon
		},
		{
			name: 'Blogs',
			href: `/admin/blogs`,
			isAuthorized: me.role === Role.ADMIN,
			icon: RssIcon
		},
		{
			name: 'FAQs',
			href: `/admin/faqs`,
			isAuthorized: me.role === Role.ADMIN,
			icon: CircleHelpIcon
		},
		{
			name: 'Settings',
			href: `/admin/settings`,
			isAuthorized: me.role === Role.ADMIN,
			icon: SettingsIcon
		},
		{
			name: 'Referral',
			href: `/referral`,
			isAuthorized: true,
			icon: UsersIcon
		}
	];

	const pathname = $state(page.url.pathname);
	const isActive = (href: string) => href === pathname;
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header class="border-b">
		<Brand />
	</Sidebar.Header>
	<Sidebar.Content class="pt-8">
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each routes as { href, name, icon: Icon, isAuthorized } (href)}
						{#if isAuthorized}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton variant={isActive(href) ? 'outline' : 'default'}>
									{#snippet child({ props })}
										<a {href} {...props}>
											<Icon class="size-4" />
											<span>{name}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/if}
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
