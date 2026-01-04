<script lang="ts">
	import WhatsApp from '$lib/components/icons/WhatsApp.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { ReferralInterface, RefereeInterface } from '$lib/interface';
	import { modalStore } from '$lib/stores';
	import { cn } from '$lib/utils';
	import { onCopy, type iResult } from '@toolsntuts/utils';
	import { CopyIcon, EllipsisIcon, PencilLineIcon, PhoneIcon, Trash2Icon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	interface Props {
		referee: RefereeInterface;
		referral?: ReferralInterface;
		class?: string;
	}

	let { referee, class: className, referral }: Props = $props();

	let loading = $state(false)

	const editReferee = () => {
		$modalStore = {
			...$modalStore,
			open: true,
			data: { referral, referee },
			title: 'Edit Referee',
			description: 'Fill the form below to update referee',
			type: 'referee'
		};
	};

	const deleteReferee = async () => {
		try {
			loading = true
			const url = `/api/referees/${referee.xata_id}`;

			const options: RequestInit = {
				method: 'delete'
			};
			const response = await fetch(url, options);
			const { message, status } = await response.json() as iResult

			if (status === 'error') {
				toast.error(message)
			} else {
				toast.success(message)
				location.reload()
			}

		} catch (error: any) {
			toast.error(error.message)
		} finally {
			loading = false
		}
	};

	const chatReferee = () => {
		location.href = `https://api.whatsapp.com/send/?phone=${referee.phone}&text=Hello`
	}

	const copyPhoneNumber = async () => {
		await onCopy(referee.phone)
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), className)}>
		<EllipsisIcon class="size-4" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={copyPhoneNumber}>
				<CopyIcon class="size-4" />
				<span>Copy Phone Number</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={chatReferee}>
				<WhatsApp class="size-4" />
				<span>Chat Referee</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="text-blue-500" onclick={editReferee}>
				<PencilLineIcon class="size-4" />
				<span>Edit Referee</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="text-red-500" onclick={deleteReferee}>
				<Trash2Icon class="size-4" />
				<span>Delete Referee</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
