<script lang="ts">
	import type { iFile, iCampaign } from '$lib/interface';
	import { getStyle, onCopy } from '@toolsntuts/utils';
	import { Trash2Icon, PencilIcon, CopyIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { cn } from '$lib/utils';
	import { deleteCampaignApi } from '$lib/fxns/api';

	interface Props {
		campaign: iCampaign;
		small?: boolean;
		onview: (id: string) => void;
		onedit: (id: string) => void;
	}

	let { campaign, onedit }: Props = $props();
	const { xata_id } = campaign;

	const style = getStyle((campaign.file as iFile)?.url || 'placeholder.webp');
</script>

<div
	aria-label={campaign.title}
	class="flex flex-col space-y-2 overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary"
>
	<div class="aspect-video object-cover" {style}></div>
	<div class="flex flex-col items-center space-y-1 p-4 pt-0">
		<h2 class="sub-title line-clamp-1 w-full font-semibold">
			{campaign.title}
		</h2>
		<p class="line-clamp-2 w-full text-muted-foreground">{campaign.description}</p>
		<hr class="dark:opacity-30" />
	</div>
	<div class="mt-auto flex items-center justify-end border-t border-t-muted-foreground/10">
		<Button
			onclick={() => onCopy(xata_id)}
			class="rounded-none border-y-0 border-l-0 text-green-500"
			variant="outline"
			size="icon"
		>
			<CopyIcon class="size-4" />
		</Button>
		<Button
			onclick={() => onedit(xata_id)}
			class="rounded-none border-y-0 border-l-0 text-blue-500"
			variant="outline"
			size="icon"
		>
			<PencilIcon class="size-4" />
		</Button>
		<AlertDialog
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'rounded-none border-y-0 border-l-0 text-red-500'
			)}
			name={`${campaign.title} product`}
			onconfirm={() => deleteCampaignApi(campaign)}
			disabled={false}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	</div>
</div>
