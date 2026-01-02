<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Competitors } from '$lib/constants';
	import type { iGenericCompetitor, iSKU } from '$lib/interface';
	import { modalStore } from '$lib/stores';
	import { cn } from '$lib/utils';
	import FindSkuForm from '../forms/FindSKUForm.svelte';
	import ProductViewForm from '../forms/ProductViewForm.svelte';
	import ViewCompetitionForm from '../forms/ViewCompetitionForm.svelte';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
</script>

<Dialog.Root open={$modalStore.open}>
	<Dialog.Content
		class={cn(
			'mx-auto w-[calc(100%-32px)] rounded-lg bg-jumia-lighter-bg p-4 dark:bg-background',
			$modalStore.className
		)}
	>
		<Dialog.Header class="contents gap-0 space-y-0 text-left">
			<Dialog.Title class="p-1 text-base">
				<h2 class="capitalize">{$modalStore.title}</h2>
				<span class="text-sm font-[400] text-muted-foreground">
					{$modalStore.description}
				</span>
			</Dialog.Title>
		</Dialog.Header>

		<Dialog.Description class="sr-only">
			{$modalStore.description}
		</Dialog.Description>

		{#if $modalStore.type === 'competition'}
			<FindSkuForm type="competition" />
		{/if}
		
		{#if $modalStore.type === 'cleanup'}
			<FindSkuForm type="cleanup" />
		{/if}

		{#if $modalStore.type === 'view-product'}
			<ScrollArea class="max-h-[50vh] md:h-fit">
				<ProductViewForm product={$modalStore.data as iSKU} />
			</ScrollArea>
		{/if}

		{#if $modalStore.type === 'view-competition'}
			{@const competitors = $modalStore.data as iGenericCompetitor[]}
			<ScrollArea class="max-h-[50vh]">
				<ViewCompetitionForm {competitors} />
			</ScrollArea>
		{/if}
	</Dialog.Content>
</Dialog.Root>
