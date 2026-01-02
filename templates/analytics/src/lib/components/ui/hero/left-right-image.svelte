<script lang="ts" module>
	export interface iImageSrcAlt {
		src: string;
		alt: string;
	}

	export interface iTextUrl {
		text: string;
		url: string;
	}
</script>

<script lang="ts">
	import { ArrowRight, ArrowUpRight } from 'lucide-svelte';
	import { Badge } from '../badge';
	import { Button } from '../button';
	interface Props {
		badge?: iTextUrl;
		title: string;
		subline: string;
		buttons?: {
			primary?: iTextUrl;
			secondary?: iTextUrl;
		};
		image: iImageSrcAlt;
	}
	let {
		badge = {
			text: '✨ Your Website Builder',
			url: '/#'
		},
		title = 'Blocks Built With Shadcn & Tailwind',
		subline = 'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
		buttons = {
			primary: {
				text: 'Discover all components',
				url: 'https://www.shadcnblocks.com'
			},
			secondary: {
				text: 'View on GitHub',
				url: 'https://www.shadcnblocks.com'
			}
		},
		image = {
			src: 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
			alt: 'Hero section demo image showing interface components'
		}
	}: Props = $props();
</script>

<section class="py-8">
	<div class="grid items-center gap-8 lg:grid-cols-2">
		<div
			class="flex h-full flex-col items-center justify-between text-center lg:items-start lg:text-left"
		>
			{#if badge}
				<Badge variant="outline" href={badge.url} class="py-1">
					{badge.text}
					<ArrowUpRight class="ml-2 size-4" />
				</Badge>
			{/if}
			<div>
				<h1 class="my-6 text-pretty text-3xl font-bold text-primary dark:text-white lg:text-5xl">
					{title}
				</h1>
				<p class="mb-8 max-w-xl text-muted-foreground lg:text-xl">
					{subline}
				</p>
			</div>
			<div class="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
				{#if buttons.primary}
					<Button class="w-full sm:w-auto" href={buttons.primary.url}>
						{buttons.primary.text}
					</Button>
				{/if}
				{#if buttons.secondary}
					<Button href={buttons.secondary.url} variant="outline" class="w-full sm:w-auto">
						{buttons.secondary.text}
						<ArrowRight class="size-4" />
					</Button>
				{/if}
			</div>
		</div>
		<img src={image.src} alt={image.alt} class="max-h-96 w-full rounded-md object-cover" />
	</div>
</section>
