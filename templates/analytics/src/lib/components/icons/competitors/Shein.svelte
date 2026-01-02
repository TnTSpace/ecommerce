<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<div class={cn('size-10 flex items-center justify-center font-bold text-xl', className)}>
	S
</div>