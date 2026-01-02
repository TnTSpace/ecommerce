<script lang="ts">
	import type { iGenericCompetitor } from '$lib/interface';
	import { Trash2Icon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Card } from '../ui/card';
	import Badge from '../ui/badge/badge.svelte';
	import { ExternalLink } from '@lucide/svelte';

	interface Props {
		competitor: iGenericCompetitor;
		ondelete: (competitor: iGenericCompetitor) => void;
	}

	let { competitor, ondelete }: Props = $props();

	const formatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	const date = formatter.format(new Date(competitor.timestamp));
</script>

<Card class="flex flex-col  gap-1 p-2">
	<a href={competitor.href ?? competitor.url} target="_blank">
		<div class="mt-1 grid grid-cols-[1fr_40px] items-center gap-2">
			<Badge class="size-fit capitalize">
				{competitor.competitor}</Badge
			>

			<Button variant="ghost" size="icon">
				<ExternalLink class="size-4" />
			</Button>
		</div>
		<h3 class="line-clamp-3 text-sm">{competitor.name}</h3>
	</a>
	<div class="flex flex-col gap-1 h-full justify-end mt-auto">
		<hr />
		<div class="flex items-center justify-between">
			<div>
				<div class="font-medium">
					{Number(competitor.price).toLocaleString()}
				</div>
				<p class="text-xs text-muted-foreground">
					{date}
				</p>
			</div>
			<Button variant="ghost" size="icon" onclick={() => ondelete(competitor)}>
				<Trash2Icon class="size-4" />
			</Button>
		</div>
	</div>
</Card>
