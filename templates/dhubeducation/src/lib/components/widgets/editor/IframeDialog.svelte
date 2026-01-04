<script lang="ts">
	// @ts-ignore
	import { ArrowRightIcon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Snippet } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	interface Props {
		children: Snippet;
		getUrl: (url: string) => void;
		title?: string;
	}

	let { getUrl, title = 'Enter YouTube embed url or video link', children }: Props = $props();

	let open: Writable<boolean> = writable(false)

	const onsubmit = (evt: SubmitEvent) => {
		evt.preventDefault()
		const form = evt.target as HTMLFormElement
		const formData = new FormData(form)
		const entries = Object.fromEntries(formData.entries())
		const url = entries.url as string
		getUrl(url)
		$open = false
	}

</script>

<Dialog.Root open={$open}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'ghost' })}>{@render children()}</Dialog.Trigger>
	<Dialog.Content class="mx-auto w-[calc(100%-32px)] rounded-lg p-4">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
		</Dialog.Header>
		<form class="grid grid-cols-[1fr_40px] gap-4" {onsubmit}>
			<Input
				name="url"
				placeholder="Enter embed link"
				class="focus-visible:ring-0 focus-visible:ring-offset-0 dark:focus-visible:ring-0"
			/>
			<Dialog.Close type="submit" class={buttonVariants({ variant: "outline", size: "icon" })}>
				<ArrowRightIcon class="size-4" />
			</Dialog.Close>
		</form>
	</Dialog.Content>
</Dialog.Root>
