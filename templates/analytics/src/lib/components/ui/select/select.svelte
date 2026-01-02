<script lang="ts" module>
	export interface iSelectItem {
		value: string;
		label: string;
	} 
</script>
 
<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	interface Props {
		options: iSelectItem[];
		value: string;
		name: string;
		class?: string;
	}

	let { options, value = $bindable(''), name, class: className }: Props = $props();

	const triggerContent = $derived(
		options.find((f) => f.value === value)?.label ?? `Select ${name}`
	);
</script>

<Select.Root type="single" {name} bind:value>
	<Select.Trigger class={className}>
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading class="capitalize">{name}</Select.GroupHeading>
			{#key value}
				{#each options as option (option.value)}
					<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
				{/each}
			{/key}
		</Select.Group>
	</Select.Content>
</Select.Root>
