<script lang="ts">
	import { cn } from "$lib/utils";
  import { firecrawl } from "$lib/hooks/firecrawl.svelte";
	import type { TState } from "$lib/interface";

  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props()

  const colorStates: Record<TState, string> = {
    idle: "bg-jumia-light-bg dark:bg-background text-muted-foreground",
    pending: "bg-orange-100 dark:bg-orange-500/10 text-orange-500",
    success: "bg-green-100 dark:bg-green-700/10 text-green-700 dark:text-green-500",
    error: "bg-red-100 dark:bg-red-700/10 text-red-700 dark:text-red-500"
  }

  const colorState = $derived(colorStates[firecrawl.status.state])
</script>

<div class={cn("h-8 w-full sticky top-0 left-0 z-[1] bg-jumia-light-bg dark:bg-background", className, colorState)}>
  <div class="w-full md:center h-full !py-0 flex px-4 md:px-0 md:gap-1 items-center text-xs font-semibold italic">
    <span class="capitalize">{firecrawl.status.state}</span>: {firecrawl.status.message}
  </div>
</div>