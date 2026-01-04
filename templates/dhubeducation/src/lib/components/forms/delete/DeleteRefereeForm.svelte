<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';
	import type { RefereeInterface } from '$lib/interface';
	import { modalStore } from '$lib/stores';
	import { cn } from '$lib/utils';
	import type { iResult } from '@toolsntuts/utils';
	import { toast } from 'svelte-sonner';

	interface Props {
		referee: RefereeInterface;
		class?: string;
	}

	let loading = $state(false);

	let { referee, class: className }: Props = $props();

	let onclick = async () => {
		try {
			loading = true;
			const url = `/api/referees/${referee.xata_id}`;
			const options: RequestInit = {
				method: 'delete'
			};
			const response = await fetch(url, options);
			const { status, message } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				toast.success("Successfully deleted Referee");
				location.reload();
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const closeModal = () => {
		$modalStore = { ...$modalStore, open: false };
	};
</script>

<div class={cn('flex flex-col gap-4', className)}>
	<div class="flex items-center justify-end gap-2">
		<Button variant="outline" onclick={closeModal}>Cancel</Button>
		{#if loading}
			<Button variant="destructive">
				<SpinLoader />
			</Button>
		{:else}
			<Button variant="destructive" {onclick}>Continue</Button>
		{/if}
	</div>
</div>
