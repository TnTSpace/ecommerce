<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Search from 'lucide-svelte/icons/search';
	import { getContext, onDestroy } from 'svelte';
	import { removeRingClasses } from '@toolsntuts/utils';
	import { cn } from '../../../utils/index';
	import { ArrowRightIcon } from 'lucide-svelte';
	import { page } from '$app/state';
	import { Input } from '../input';
	import { Button } from '../button';

	interface Props {
		inputValue: string;
		class?: string;
		showBtn?: boolean;
		onkeyup: (evt: Event) => void;
	}

	const products = getContext('products');

	let { inputValue = $bindable(), onkeyup, class: className, showBtn = false }: Props = $props();

	let isLoading = $state(false);
	let timer: null | ReturnType<typeof setTimeout> = $state(null);

	const handleInput: EventHandler<Event, HTMLInputElement> = () => {
		if (timer) clearTimeout(timer);

		if (!inputValue) {
			isLoading = false;
			return;
		}

		isLoading = true;
		timer = setTimeout(() => {
			isLoading = false;
			timer = null;
		}, 500);
	};

	onDestroy(() => {
		if (timer) clearTimeout(timer);
	});

	const onsubmit = (evt: SubmitEvent) => {
		evt.preventDefault();

		if (showBtn) {
			const form = evt.target as HTMLFormElement;
			const formData = new FormData(form);
			const entries = Object.fromEntries(formData.entries());

			const url = new URL(`${page.url.origin}/catalog`);
			url.searchParams.set('search', entries.search as string);
			location.href = url.href;
		}
	};
</script>

<form class={cn('space-y-2', className)} {onsubmit}>
	<div class="relative">
		<Input
			name="search"
			class={cn('peer rounded-full pe-9 ps-9', removeRingClasses())}
			placeholder="Search..."
			type="text"
			{onkeyup}
			bind:value={inputValue}
			oninput={handleInput}
		/>
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
		>
			{#if isLoading}
				<LoaderCircle
					class="animate-spin"
					size={16}
					stroke-width={2}
					aria-hidden="true"
					role="presentation"
				/>
			{:else}
				<Search size={16} stroke-width={2} aria-hidden="true" />
			{/if}
		</div>
		{#if showBtn}
			<Button
				type="submit"
				size="icon"
				class="absolute right-0 top-1/2 z-[1] size-9 -translate-y-1/2 rounded-full"
			>
				<ArrowRightIcon class="size-4" />
			</Button>
		{/if}
	</div>
</form>
