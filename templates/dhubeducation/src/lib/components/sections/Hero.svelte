<script lang="ts">
	import type { iHero } from '$lib/interfaces';
	import { cn } from '$lib/utils';

	export let options: iHero;
	export let hideTitle: boolean = false

	const { title, cta = false, href, height, subline, isHome = false, backgroundImage = '/images/bg.webp' } = options;
	const homeHeight = isHome ? 'md:h-screen' : 'h-[56.25vw] max-h-[400px] min-h-[300px]';
	const heightClasses = height ? height : `aspect-square ${homeHeight}`;


</script>

<section
	aria-label="hero"
	class={`hero ${heightClasses} overflow-hidden text-white text-center w-full relative flex items-center justify-center center`}
	style={`background-image: url('${backgroundImage}');`}
	id="hero">
	<div
		class={cn("w-full h-full px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] flex justify-center text-center items-center flex-col gap-4", hideTitle ? "" : "bg-[hsla(0,0%,0%,0.65)]")}>
		{#if !hideTitle}
			<div>
				<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase">{title}</h1>
				<p class="md:text-lg max-w-2xl">{subline && subline.join(', ')}</p>
			</div>
		{/if}
		{#if cta}
			<div class="flex w-full justify-center gap-3">
				<a
					{href}
					aria-label="about us"
					class="w-full md:w-fit hidden md:block bt py-3 text-white text-sm border-white border-2 bg-transparent text-center"
					>know more</a
				>
				<a
					href="/enquiry"
					aria-label="enquiry footer button"
					class="w-full block md:hidden md:w-fit bt py-3 text-white text-sm border-white border-2 bg-transparent text-center"
					>enquiry</a
				>
			</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.slider {
		display: flex;
	}

	.slide {
		flex: 1;
		opacity: 0;
		background-size: cover;
		background-position: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		transition: opacity 0.3s ease-in-out;
	}

	.slide.active {
		opacity: 1;
	}
</style>
