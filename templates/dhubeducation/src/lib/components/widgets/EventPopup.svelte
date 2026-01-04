<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	// import DialogImg from '$lib/assets/dialog-content.png';
	import { cn } from '$lib/utils';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import type { iCampaign, iImage } from '$lib/interface';
	import { popupStore } from '$lib/stores';
	import { removeRingClasses } from '@toolsntuts/utils';
 
	interface Props {
		campaigns: iCampaign[];
	}

	let { campaigns: steps }: Props = $props();
	// const steps = [
	// 	{
	// 		description:
	// 			'Discover a powerful collection of components designed to enhance your development workflow.',
	// 		title: 'Welcome to Origin UI'
	// 	},
	// 	{
	// 		description:
	// 			'Each component is fully customizable and built with modern web standards in mind.',
	// 		title: 'Customizable Components'
	// 	},
	// 	{
	// 		description: 'Begin building amazing interfaces with our comprehensive component library.',
	// 		title: 'Ready to Start?'
	// 	},
	// 	{
	// 		description:
	// 			'Access our extensive documentation and community resources to make the most of Origin UI.',
	// 		title: 'Get Support'
	// 	}
	// ];

	let step = $state(1);

	function handleContinue() {
		if (step < steps.length) {
			step += 1;
		}
	}

	const onOpenChange = (open: boolean) => {
		// $popupStore.open = value;
		$popupStore = { ...$popupStore, date: new Date().toLocaleDateString(), open };

		if (open) step = 1;
	};

	const goToPage = () => {
		$popupStore = { ...$popupStore, date: new Date().toLocaleDateString(), open: false };
		location.href = `/campaigns/${steps[step - 1].xata_id}`;
	};

	const isStep = (index: number) => index === step - 1;
</script>

<Dialog.Root open={$popupStore.open} {onOpenChange}>
	<!-- <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Onboarding</Dialog.Trigger> -->
	<Dialog.Content
		class="z-[150] mx-auto w-[calc(100vw-32px)] gap-0 rounded-lg p-2 md:p-6 [&>button:last-child]:text-white"
	>
		<div class="relative aspect-[382/216] w-full overflow-hidden rounded">
			{#each steps as step, i}
				<Button
					onclick={goToPage}
					variant="ghost"
					class={cn(
						'object-fit absolute left-1/2 top-1/2 aspect-auto h-auto w-full -translate-x-1/2 -translate-y-1/2 p-0 opacity-0',
						isStep(i) && 'opacity-100',
						removeRingClasses()
					)}
				>
					<img class="w-full" src={(step?.file as iImage)?.url} alt="dialog" />
				</Button>
			{/each}
		</div>
		<div class="space-y-6 pt-3">
			<Dialog.Header>
				<Dialog.Title>{steps[step - 1].title}</Dialog.Title>
				<Dialog.Description class="line-clamp-2">{steps[step - 1].description}</Dialog.Description>
				<!-- <Button onclick={goToPage} variant="outline">Discover</Button> -->
				 <Button href="https://forms.gle/XTG2VhN3fqngCSGU6" _target="blank" variant="outline">Register</Button>
			</Dialog.Header>
			<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div class="flex justify-center space-x-1.5 max-sm:order-1">
					{#each { length: steps.length } as _, index (index)}
						<div
							class={cn(
								'h-1.5 w-1.5 rounded-full bg-primary',
								index + 1 === step ? 'bg-primary' : 'opacity-20'
							)}
						></div>
					{/each}
				</div>
				<Dialog.Footer class="gap-2">
					<Dialog.Close class={buttonVariants({ variant: 'ghost' })}>Skip</Dialog.Close>
					{#if step < steps.length}
						<Button class="group" type="button" onclick={handleContinue}>
							Next
							<ArrowRight
								className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
								size={16}
								strokeWidth={2}
								aria-hidden="true"
							/>
						</Button>
					{:else}
						<Dialog.Close class={buttonVariants()}>Okay</Dialog.Close>
					{/if}
				</Dialog.Footer>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
