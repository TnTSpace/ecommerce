<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuGroupHeading,
		DropdownMenuSub,
		DropdownMenuSubTrigger,
		DropdownMenuSubContent,
		DropdownMenuItem,
		DropdownMenuSeparator
	} from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { Snippet } from 'svelte';
	import type { Editor } from '@tiptap/core';
	import type { Writable } from 'svelte/store';
	import { groups } from './utils/index.js';

	interface Props {
		children: Snippet;
		editor: Writable<Editor>;
	}

	let { children, editor }: Props = $props();
</script>

{#if $editor}
	<DropdownMenu>
		<DropdownMenuTrigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
			{@render children()}
		</DropdownMenuTrigger>
		<DropdownMenuContent
			class="h-auto max-h-96 w-56 overflow-auto bg-white dark:bg-secondary md:max-h-full"
		>
			{#each groups as { groupName, menus }, i}
				<DropdownMenuGroup>
					<DropdownMenuGroupHeading class="text-xs uppercase text-muted-foreground"
						>{groupName}</DropdownMenuGroupHeading
					>
					<DropdownMenuGroup>
						{#each menus as { name, icon, submenus, onclick }, i}
							{#if submenus}
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										{@const SubmenuIcon = submenus.trigger.icon}
										<SubmenuIcon class="mr-2 size-4" />
										<span>{submenus.trigger.name}</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuSubContent class="bg-white dark:bg-secondary">
										{#each submenus.menus as { name, icon, onclick, ondisable }, i}
											{#if ondisable && ondisable($editor)}
												<DropdownMenuItem
													onclick={() => onclick($editor)}
													disabled={ondisable($editor)}
												>
													{@const Icon = icon}
													<Icon class="mr-2 size-4" />
													<span>{name}</span>
												</DropdownMenuItem>
											{:else}
												<DropdownMenuItem onclick={() => onclick($editor)}>
													{@const Icon = icon}
													<Icon class="mr-2 size-4" />
													<span>{name}</span>
												</DropdownMenuItem>
											{/if}
										{/each}
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							{:else}
								<DropdownMenuItem onclick={() => onclick($editor)}>
									{@const Icon = icon}
									<Icon class="mr-2 size-4" />
									<span>{name}</span>
								</DropdownMenuItem>
							{/if}
						{/each}
					</DropdownMenuGroup>
					{#if i !== groups.length - 1}
						<DropdownMenuSeparator />
					{/if}
				</DropdownMenuGroup>
			{/each}
		</DropdownMenuContent>
	</DropdownMenu>
{/if}
