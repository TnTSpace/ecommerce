<script lang="ts">
	import { Button } from '../button';
	import { ChevronRightIcon } from 'lucide-svelte';

	interface Props {
		title: string;
		subline: string;
	}

	let { title, subline }: Props = $props();
</script>

<div class="py-24 lg:py-32">
	<!-- announcement banner -->
	<div class="flex justify-center">
		<a
			class="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
			href="/#"
		>
			PRO release - Join to waitlist
			<span
				class="inline-flex size-10 items-center justify-center gap-x-2 rounded-full bg-muted-foreground/15 px-2.5 py-1.5 text-sm font-semibold"
			>
				<svg
					class="h-4 w-4 flex-shrink-0"
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width={2}
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			</span>
		</a>
	</div>
	<!-- end announcement banner -->
	<!-- title -->
	<div class="mx-auto mt-5 max-w-2xl text-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{title}
		</h1>
	</div>
	<!-- end title -->
	<div class="mx-auto mt-5 max-w-3xl text-center">
		<p class="text-xl text-muted-foreground">
			{subline}
		</p>
	</div>
	<!-- buttons -->
	<div class="mt-8 flex flex-col justify-center gap-3 md:flex-row">
		<Button size={'lg'}>Get started</Button>
		<Button size={'lg'} variant={'outline'}>Learn more</Button>
	</div>
	<!-- end buttons -->
	<div class="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
		<span class="text-sm text-muted-foreground"> Package Manager: </span>
		<span class="text-sm font-bold">npm </span>
		<svg
			class="h-5 w-5 text-muted-foreground"
			width={16}
			height={16}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round" />
		</svg>
		<a
			class="inline-flex items-center gap-x-1 text-sm font-medium decoration-2 hover:underline"
			href="/#"
		>
			Installation Guide
			<ChevronRightIcon class="h-4 w-4 flex-shrink-0" />
		</a>
	</div>
</div>
