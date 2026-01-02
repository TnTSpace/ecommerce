<script lang="ts" module>
	export const isClickScrolling = writable(false);
</script>

<script lang="ts">
	import { stripHtmlTags } from '../../../fxns/index';
	import { cn } from '../../../utils/index';
	import { writable } from 'svelte/store';
	import { currentHtml, htmlSectionStore } from './stores';
	import { isOpen } from './nav-top.svelte';

	// Function to handle smooth scrolling with 64px offset
	function scrollToHeading(e: MouseEvent, id: string) {
		e.preventDefault();
		const el = document.getElementById(id);
		if (el) {
			const offset = 104;
			const targetY = el.getBoundingClientRect().top + window.scrollY - offset;

			$currentHtml.section = el;
			$currentHtml.id = id;
			$currentHtml.link = document.getElementById(`${id}-link`) as Element;
			$isOpen = false;
			$isClickScrolling = true;
			window.scrollTo({ top: targetY, behavior: 'smooth' });

			let lastY = window.scrollY;

			let intervalId = setInterval(() => {
				const currentY = window.scrollY;
				if (currentY !== lastY) {
					lastY = currentY;
				} else {
					clearInterval(intervalId);
					// Stop checking for scroll
					$isClickScrolling = false;
					// Reset the lastY value
				}
			}, 100);
		}
	}

	const isActive = (id: string) => id === $currentHtml?.id;
</script>

<div dir="ltr" class="flex flex-col overflow-hidden">
	<div
		data-radix-scroll-area-viewport=""
		class="relative size-full min-h-0 rounded-[inherit] text-sm"
	>
		<div style="min-width:100%;display:table">
			<div
				role="none"
				class="absolute start-0 hidden w-0.5 bg-primary transition-all md:block"
				style={`top: ${($currentHtml.link?.getBoundingClientRect()?.top ?? 0) - 52}px; height: ${$currentHtml.link?.getBoundingClientRect().height ?? 0}px;`}
			></div>

			<div class="flex flex-col gap-1 border-s-2 text-muted-foreground">
				{#each $htmlSectionStore as section, i}
					<a
						id={`${section.id}-link`}
						href={`#${section.id}`}
						onclick={(e) => scrollToHeading(e, section.id)}
						class={cn('py-1 ps-4 transition-colors', isActive(section.id) && 'text-primary')}
					>
						{stripHtmlTags(section.title)}
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
