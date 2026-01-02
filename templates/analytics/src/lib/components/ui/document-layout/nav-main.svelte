<script lang="ts">
	import * as Collapsible from '../collapsible/index.js';
	import * as Sidebar from '../sidebar/index.js';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { groupedDocs } from './stores';

	// let {
	// 	items
	// }: {
	// 	items: {
	// 		title: string;
	// 		url: string;
	// 		// This should be `Component` after @lucide/svelte updates types
	// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// 		icon: any;
	// 		isActive?: boolean;
	// 		items?: {
	// 			title: string;
	// 			url: string;
	// 		}[];
	// 	}[];
	// } = $props();
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each Array.from($groupedDocs.entries()) as [category, docs] (category)}
			<Collapsible.Root open={true}>
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Sidebar.MenuButton>
							{#snippet tooltipContent()}
								{category}
							{/snippet}
							{#snippet child({ props })}
								<a href={`/${category.toLowerCase()}`} {...props}>
									<span class="capitalize">{category}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if docs}
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuAction {...props} class="data-[state=open]:rotate-90">
										<ChevronRight />
										<span class="sr-only">Toggle</span>
									</Sidebar.MenuAction>
								{/snippet}
							</Collapsible.Trigger>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{#each docs as doc (doc.xata_id)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton href={`/${category.toLowerCase()}/${doc.xata_id}`}>
												<span>{doc.title}</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						{/if}
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
