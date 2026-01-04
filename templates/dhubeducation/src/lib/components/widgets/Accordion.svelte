<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import type { iAccordionItem } from '$lib/interface';
	import { slugify } from '@toolsntuts/utils';

	interface Props {
		items: iAccordionItem[];
	}

	let { items }: Props = $props();
</script>

<Accordion.Root type="single" class="w-full">
	{#each items as item, i}
		<Accordion.Item value={slugify(item.title)}>
			<Accordion.Trigger class="text-start text-sm">{item.title}</Accordion.Trigger>
			<Accordion.Content class="text-start text-sm prose dark:prose-invert">{@html item.description}</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
