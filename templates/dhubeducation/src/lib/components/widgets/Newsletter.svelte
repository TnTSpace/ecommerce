<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import Logo from '../icons/Logo.svelte';
	import { popupStore } from '$lib/stores';
	import NewsletterForm from '../forms/NewsletterForm.svelte';


	const onOpenChange = (value: boolean) => {
		// $popupStore.open = value;
		$popupStore = { ...$popupStore, date: new Date().toLocaleDateString(), open: value}
	};
</script>

<Dialog.Root open={$popupStore.open} {onOpenChange}>
	<!-- <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Newsletter</Dialog.Trigger> -->
	<Dialog.Content class="mx-auto w-[calc(100vw-32px)]">
		<div class="mb-2 flex flex-col items-center gap-2">
			<div
				class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border p-2"
				aria-hidden="true"
			>
				<Logo />
			</div>
			<img src="/newsletter.webp" alt="newsletter"/>
			<Dialog.Header>
				<Dialog.Title class="sm:text-center">Never miss an update</Dialog.Title>
				<Dialog.Description class="sm:text-center">
					Subscribe to receive news and special offers.
				</Dialog.Description>
			</Dialog.Header>
		</div>

		<NewsletterForm />

		<p class="text-center text-xs text-muted-foreground">
			By subscribing you agree to our
			<a class="underline hover:no-underline" href="/privacy-policy">Privacy Policy</a>.
		</p>
	</Dialog.Content>
</Dialog.Root>
