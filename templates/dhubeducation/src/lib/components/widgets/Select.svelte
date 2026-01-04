<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { cn } from '$lib/utils';
	import { removeRingClasses } from '@toolsntuts/utils';
	interface Props {
		class?: string;
		value?: string;
		name: string;
		options: { label: string; value: string }[];
		onselected?: (selected: string) => void;
		shouldResetOnSelection?: boolean;
	}

	let {
		class: className,
		name,
		options,
		value = $bindable(''),
		onselected,
		shouldResetOnSelection = false
	}: Props = $props();

	const triggerContent = $derived(
		options.find((f) => f.value === value)?.label ?? `Select a ${name}`
	);

	const onValueChange = (selected: string) => {
		onselected?.(selected);
	};
</script>

<Select.Root type="single" {onValueChange} {name} bind:value>
	<Select.Trigger class={cn(className, removeRingClasses())}>
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each options as option}
				<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
