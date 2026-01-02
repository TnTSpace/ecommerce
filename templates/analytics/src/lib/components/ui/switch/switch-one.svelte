<script lang="ts">
	import { cn } from '../../../utils/index';
	import { Label } from '../label';
	import Switch from './switch.svelte';

	interface Props {
		name: string;
		description: string;
		checked: boolean;
		onSwitch?: (checked: boolean) => void;
		class?: string;
	}

	let {
		name,
		description,
		onSwitch,
		checked = $bindable(false),
		class: className
	}: Props = $props();

	const uid = $props.id();

	$effect(() => onSwitch?.(checked));

	const defaultClasses =
		'relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/[.04] has-[[data-state=checked]]:border-ring';
</script>

<div class={cn(defaultClasses, className)}>
	<Switch
		id={uid}
		bind:checked
		class="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
		aria-describedby="{uid}-description"
	/>
	<div class="grid grow gap-2">
		<Label for={uid}>
			{name}
		</Label>
		<p id="{uid}-description" class="text-xs text-muted-foreground">
			{description}
		</p>
	</div>
</div>
