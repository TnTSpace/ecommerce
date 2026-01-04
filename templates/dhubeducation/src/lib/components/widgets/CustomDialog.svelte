<script lang="ts">
	import { modalStore } from '$lib/stores';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ReferralForm from '$lib/components/forms/ReferralForm.svelte';
	import RefereeForm from '$lib/components/forms/RefereeForm.svelte';
	import type { ReferralInterface, RefereeInterface } from '$lib/interface';
	import DeleteRefereeForm from '../forms/delete/DeleteRefereeForm.svelte';
</script>

<Dialog.Root open={$modalStore.open}>
	<Dialog.Content class="mx-auto w-[calc(100%-32px)] max-w-4xl p-4 rounded-lg">
		<Dialog.Header class="contents gap-0 space-y-0 text-left">
			<Dialog.Title class="p-1 text-base">
				<h2>{$modalStore.title}</h2>
				<span class="text-sm font-[400] text-muted-foreground">{$modalStore.description}</span>
			</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description class="sr-only">
			{$modalStore.description}
		</Dialog.Description>
		{#if $modalStore.type === 'referral'}
			<ReferralForm referral={$modalStore.data as ReferralInterface} />
		{/if}

		{#if $modalStore.type === 'referee'}
			{@const { referral, referee } = $modalStore.data as {
				referral: ReferralInterface;
				referee: RefereeInterface;
			}}
			<RefereeForm referralId={referral.xata_id} {referee} />
		{/if}
		{#if $modalStore.type === 'deleteReferee'}
			{@const { referee } = $modalStore.data as { referee: RefereeInterface }}
			<DeleteRefereeForm {referee} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
