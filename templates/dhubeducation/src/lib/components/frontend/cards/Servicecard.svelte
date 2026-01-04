<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { iFile, iService } from '$lib/interface';
	import { ChevronRightIcon } from 'lucide-svelte';
	interface Props {
		service: iService;
	}

	let { service }: Props = $props();

	const src = `${(service.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset`;
	const href = `/services/${service.xata_id}`;
</script>

<div
	aria-label={service.name}
	class="flex flex-col gap-2 space-y-2 overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary"
>
	<Button
		{href}
		aria-label={service.name}
		class="aspect-video h-auto overflow-hidden object-cover p-0 hover:bg-transparent"
	>
		<img {src} loading="lazy" alt={service.name} class="h-full w-full" />
	</Button>
	<div class="flex flex-col space-y-1 p-4 pt-0 text-start">
		<h2 class="sub-title line-clamp-1 w-full font-semibold">
			{service.name}
		</h2>
		<p class="line-clamp-2 w-full text-muted-foreground">{service.description}</p>
	</div>
	<Button {href} variant="link" class="items-center">
		<span>Read</span>
		<ChevronRightIcon class="size-4" />
	</Button>
</div>
