<script lang="ts">
	import type { iImage, iFaq, } from '$lib/interface';
	import { CircleHelp, CircleHelpIcon } from 'lucide-svelte';
	import { getStyle, slugify, onCopy } from '@toolsntuts/utils';
	import { Trash2Icon, PencilIcon, CopyIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { cn } from '$lib/utils';
	import { deleteFaqApi } from '$lib/fxns/api';
	import { Badge } from '$lib/components/ui/badge';

	interface Props {
		faq: iFaq;  
		onview: (id: string) => void;
		onedit: (id: string) => void;
	}

	let { faq, onedit }: Props = $props();

	const { xata_id, question, category } = faq;

</script>

<div
	aria-label={faq.question}
	class="flex flex-col overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary"
>
	<div class="flex flex-col items-start justify-start space-y-2 p-4 pt-0">
		<CircleHelp class="size-16" />
		<Badge>{category}</Badge>
		<p class="w-full overflow-hidden text-ellipsis whitespace-pre-wrap">{question}</p>
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
			name={question}
			onconfirm={() => deleteFaqApi(faq)}
			disabled={false}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	</div>
</div>
