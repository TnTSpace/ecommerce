<script lang="ts">
	import type { iFile, iPartner, TService } from '$lib/interface';
	import { getStyle } from '@toolsntuts/utils';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRightIcon } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	interface Props {
		partner: iPartner;
	}

	let { partner }: Props = $props();

	const { xata_id } = partner;

	const src = `${(partner.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset`;

	const href = `/partners/${xata_id}`;
</script>

<div
	aria-label={partner.name}
	class="relative flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary mt-0"
>
	<Badge class="absolute right-2 top-2 rounded-full bg-green-100 text-green-700 z-50"
		>University Partner</Badge
	>
	<Button
		{href}
		aria-label={partner.name}
		class="aspect-video h-auto object-cover p-0 hover:bg-transparent"
	>
		<img {src} loading="lazy" alt={partner.name} class="h-full w-full" />
	</Button>
	<div class="flex flex-col space-y-1 p-4 py-0 text-start">
		<h2 class="sub-title line-clamp-1 w-full font-semibold text-sm">
			{partner.name}
		</h2>
		<Badge class="w-fit">{partner.country}</Badge>
	</div>
	<Button {href} variant="link" class="items-center">
		<span>Read</span>
		<ChevronRightIcon class="size-4" />
	</Button>
</div>
