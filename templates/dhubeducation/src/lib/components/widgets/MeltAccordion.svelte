<script lang="ts">
  import { Accordion } from "melt/builders";
  import type { iAccordionItem } from "$lib/interface";

  interface Props {
    items: iAccordionItem[]
  }

  let { items }: Props = $props()

  const accordion = new Accordion();
</script>

<div class="overflow-hidden first:rounded-t-xl last:rounded-b-xl" {...accordion.root}>
  {#each items as i}
    {@const item = accordion.getItem(i)}
    <h2 class="relative flex svelte-xwvizf" {...item.heading}>
      <button class="flex flex-1 cursor-pointer items-center justify-between bg-gray-200 px-5 py-5 text-base font-medium leading-none text-gray-800 outline-none transition-colors hover:bg-gray-300 dark:hover:bg-gray-500/50 dark:active:bg-gray-600/50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200  border-b border-neutral-200 dark:border-neutral-700 svelte-xwvizf" {...item.trigger}>
        {item.item.title}
      </button>
    </h2>

    <div class="content overflow-hidden bg-white p-4 text-sm dark:bg-gray-900 dark:text-white/80 svelte-xwvizf" {...item.content}>
      {@html item.item.description}
    </div>
  {/each}
</div>