<script lang="ts">
	import { cn } from '../../../utils/index';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<div
	class={cn('size-4 animate-spin rounded-full border-b-2 border-t-2 border-white', className)}
></div>
