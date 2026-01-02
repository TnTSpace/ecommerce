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
			value: '0-100',
			label: 'All products',
			length: 0
		},
		{
			value: '50-100',
			label: '50% or more',
			length: 5
		},
		{
			value: '40-100',
			label: '40% or more',
			length: 4
		},
		{
			value: '30-100',
			label: '30% or more',
			length: 3
		},
		{
			value: '20-100',
			label: '20% or more',
			length: 2
		},
		{
			value: '10-100',
			label: '10% or more',
			length: 1
		},
		{
			value: '0-0',
			label: 'No discount',
			length: 0
		}
	];

	let { value = $bindable() }: Props = $props();
</script>

<RadioGroup bind:value class="space-y-1">
	{#each options as { value, label }, i}
		<div class="flex items-center gap-2">
			<RadioGroupItem {value} id="radio-d-{value}" />
			<Label for="radio-d-{value}" class="inline-flex cursor-pointer items-center gap-1">
				{label}
			</Label>
		</div>
	{/each}
</RadioGroup>
