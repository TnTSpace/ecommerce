<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	const heroImages: { imgUrl: string; alt: string }[] = [
		{
			imgUrl: '/assets/images/hero-1.svg',
			alt: 'Smartwatch'
		},
		{
			imgUrl: '/assets/images/hero-2.svg',
			alt: 'Bag'
		},
		{
			imgUrl: '/assets/images/hero-3.svg',
			alt: 'Lamp'
		},
		{
			imgUrl: '/assets/images/hero-4.svg',
			alt: 'Air Fryer'
		},
		{
			imgUrl: '/assets/images/hero-5.svg',
			alt: 'Chair'
		}
	];

	const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });
  // const plugin = null
</script>

<div class="relative">
	<Carousel.Root
		plugins={[plugin]}
		class="w-full max-w-xl"
		onmouseenter={plugin.stop}
		onmouseleave={plugin.reset}
	>
		<Carousel.Content>
			{#each heroImages as { imgUrl, alt }, i (i)}
				<Carousel.Item>
					<div class="p-1">
						<Card.Root>
							<Card.Content class="flex p-6">
								<img src={imgUrl} {alt} class="aspect-square w-[484px] object-contain" />
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="hidden md:flex" />
		<Carousel.Next class="hidden md:flex" />
	</Carousel.Root>
	<img
		src="/assets/icons/hand-drawn-arrow.svg"
		alt="hand drawn arrow"
		class="absolute -left-[15%] bottom-0 z-0 aspect-square w-[175px] max-xl:hidden"
	/>
</div>
