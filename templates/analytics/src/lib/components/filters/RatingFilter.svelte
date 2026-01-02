<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';
	import Star from '../icons/Star.svelte';
	import { Label } from '../ui/label';

	interface Props {
		value: string;
	}

	interface iRating {
		value: string;
		label: string;
		length: number;
	}

	let options: iRating[] = [
		{
			value: '0-5',
			label: 'All products',
			length: 0
		},
		{
			value: '5-5',
			label: '5 stars',
			length: 5
		},
		{
			value: '4-5',
			label: '4 stars',
			length: 4
		},
		{
			value: '3-5',
			label: '3 stars',
			length: 3
		},
		{
			value: '2-5',
			label: '2 stars',
			length: 2
		},
		{
			value: '1-5',
			label: '1 stars',
			length: 1
		},
		{
			value: '0-0',
			label: 'No rating',
			length: 0
		}
	];

	let { value = $bindable() }: Props = $props();

</script>

<RadioGroup bind:value class="space-y-1">
	{#each options as { value, label, length }, i}
		<div class="flex items-center gap-2">
			<RadioGroupItem {value} id="radio-r-{value}" />
			<Label for="radio-r-{value}" class="inline-flex items-center gap-1 cursor-pointer">
				{#if length}
					<span class="inline-flex items-center">
						{#each Array.from({ length })}
							<Star class="size-4 fill-amber-500" />
						{/each}
						{#each Array.from({ length: options.length - length })}
							<Star class="size-4 fill-muted-foreground opacity-30" />
						{/each}
					</span>
					<span class="sr-only">{length} stars</span>
				{:else}
					{label}
				{/if}
			</Label>
		</div>
	{/each}
</RadioGroup>
