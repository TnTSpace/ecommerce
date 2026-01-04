<script lang="ts">
	import type { iFile, iPartner } from '$lib/interface';
	import { getStyle, onCopy } from '@toolsntuts/utils';
	import { Trash2Icon, PencilIcon, CopyIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { cn } from '$lib/utils';
	import { deletePartnerApi } from '$lib/fxns/api';
	import { Badge } from '$lib/components/ui/badge';

	interface Props {
		partner: iPartner;
		small?: boolean;
		onview: (id: string) => void;
		onedit: (id: string) => void;
	}

	let { partner, onedit }: Props = $props();

	const { xata_id } = partner;

	const style = getStyle((partner.file as iFile)?.url || '/placeholder.webp');
</script>

<div
	aria-label={partner.name}
	class="flex flex-col space-y-2 overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary"
>
	<div class="aspect-video object-cover" {style}></div>
	<div class="flex flex-col items-center space-y-1 p-4 pt-0">
		<h2 class="sub-title line-clamp-1 w-full font-semibold">
			{partner.name}
		</h2>
		<Badge class="w-fit">{partner.country}</Badge>
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
			name={`${partner.name} product`}
			onconfirm={() => deletePartnerApi(partner)}
			disabled={false}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	</div>
</div>
