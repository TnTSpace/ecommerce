<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	const items = [
		{
			src: '/pmo.png',
			alt: 'pmo',
			href: 'https://docs.google.com/spreadsheets/d/1Q_TXFpOUJ0kUBnPPv9LWAX04o6CEd-Z6c_k3OekdUio/edit?gid=1568213493#gid=1568213493',
			icon: '📉',
			title: 'Campaign PMO with Phoenix Prices',
			description: `Competitor prices change dynamically during live campaigns, rendering our pre-campaign Phoenix prices inaccurate and uncompetitive.`
		},
		// {
		// 	src: '/etd.png',
		// 	alt: 'etd',
		// 	href: 'https://docs.google.com/spreadsheets/d/1ZNN6MnFAYa8fB27lCJa8uxKcldfvUY40wF-rhfVvluc/edit?gid=1375436466#gid=1375436466',
		// 	icon: '🎯',
		// 	title: 'Missed Revenue Targets',
		// 	description: `Even with dataweave, we still miss sales targets on our most critical products during peak campaign periods.`
		// }
	];
</script>

<Carousel.Root class="w-[calc(100%-76px)] mx-auto md:w-full">
	<Carousel.Content>
		{#each items as { src, alt, href, icon, title, description }, i (i)}
			<Carousel.Item>
				<div>
					<Card.Root>
						<Card.Content class="p-0">
							<a {href} class="flex flex-col gap-2" target="_blank">
								<img {src} {alt} class="aspect-auto w-full rounded-lg" />
								</a>
						</Card.Content>
					</Card.Root>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root>
