<script lang="ts">
	import JumiaExpress from '$lib/components/icons/JumiaExpress.svelte';
	import JumiaGlobal from '$lib/components/icons/JumiaGlobal.svelte';
	import type { iFlattenedSKU } from '$lib/interface';

	interface Props {
		sku: iFlattenedSKU;
	}

	let { sku }: Props = $props();
</script>

<div class="flex flex-col gap-2">
	<div class="line-clamp-2 max-w-64">
		{sku.name}
	</div>
	<div class="flex items-center gap-1 flex-wrap space-x-1 relative">
		{#if sku.isShopExpress}
			<JumiaExpress class="w-[110px]" />
		{/if}
		{#if sku.shopGlobal}
			<JumiaGlobal extraclasses="text-2xs py-0.5 px-2 rounded-full" name={sku.shopGlobalName} />
		{/if}

		{#if sku.mainBadge}
			<small
				class="text-2xs flex h-[18px] items-center justify-center rounded bg-officialstores px-1 font-medium text-white dark:bg-white dark:text-officialstores"
				>{sku.mainBadgeName}</small
			>
		{/if}
		{#if sku.campaignBadge}
			{#if sku.campaignBadgeImage}
				<img
					class="h-[18px] w-[138px]"
					src={sku.campaignBadgeImage}
					alt={sku.campaignBadgeName}
				/>
			{:else}
				<span
					class="flex h-[18px] items-center justify-center rounded px-1 text-xs font-semibold"
					style={`background-color:${sku.campaignBadgeBgColor};color:${sku.campaignBadgeTextColor}`}
					>{sku.campaignBadgeName}</span
				>
			{/if}
		{/if}
	</div>
</div>
