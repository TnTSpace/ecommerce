<script lang="ts" module>
	const generateProducts = () => {
		const products: Product[] = [];
		
		const niveaProducts = [
			{ name: 'NIVEA Dry Impact Roll-on For Men (Pack Of 3)', img: 'photo-1571781926291-c477ebfd024b', price: 4400, original: 6125 },
			{ name: 'NIVEA Radiant & Beauty Advanced Care Body Lotion', img: 'photo-1556229010-6c3f2c9ca5f8', price: 7839, original: 11635 },
			{ name: 'NIVEA Pearl & Beauty Anti-Perspirant Roll-on (Pack Of 3)', img: 'photo-1556228720-195a672e8a03', price: 4571, original: 6125 },
			{ name: 'NIVEA MEN Deep Body Lotion - 400ml (Pack Of 2)', img: 'photo-1556228720-195a672e8a03', price: 6890, original: 9100 },
			{ name: 'NIVEA Dry Comfort Anti-Perspirant Spray (Pack Of 2)', img: 'photo-1571781926291-c477ebfd024b', price: 6535, original: 9595 },
			{ name: 'NIVEA Sun UV Sunscreen Face Shine Control (Pack Of 2)', img: 'photo-1556229010-6c3f2c9ca5f8', price: 14450, original: 21840 },
			{ name: 'NIVEA Black & White Invisible Clear Anti-Perspirant Spray (Pack Of 2)', img: 'photo-1571781926291-c477ebfd024b', price: 6267, original: 9595 },
			{ name: 'NIVEA Rich Nourishing Body Lotion (Pack Of 2)', img: 'photo-1556229010-6c3f2c9ca5f8', price: 7575, original: 9900 },
			{ name: 'NIVEA SUN UV Face Shine Control Cream SPF 50 - 50ml', img: 'photo-1556228720-195a672e8a03', price: 7439, original: 10920 },
			{ name: 'NIVEA Dry Comfort Roll-on (Pack Of 2)', img: 'photo-1571781926291-c477ebfd024b', price: 3238, original: 4085 },
		];
		
		for (let i = 0; i < 60; i++) {
			const template = niveaProducts[i % niveaProducts.length];
			products.push({
				id: i + 1,
				name: template.name,
				originalPrice: template.original,
				salePrice: template.price,
				discount: Math.round(((template.original - template.price) / template.original) * 100),
				image: `https://images.unsplash.com/${template.img}?w=400&h=400&fit=crop`,
				brand: 'NIVEA'
			});
		}
		
		const xiaomiProducts = [
			{ name: 'XIAOMI Redmi 15C (8GBRAM/256GB ROM)', img: 'photo-1598327105666-5b89351aff97', price: 164000, original: 172824 },
			{ name: 'XIAOMI Redmi A5 (3GB RAM/64GB ROM)', img: 'photo-1511707171634-5f897ff02aa9', price: 89999, original: 98632 },
			{ name: 'Xiaomi Redmi Note 14 (8GB RAM/256 GB ROM)', img: 'photo-1598327105666-5b89351aff97', price: 273286, original: 275286 },
			{ name: 'XIAOMI Redmi A3 (4GB RAM/128GB ROM)', img: 'photo-1511707171634-5f897ff02aa9', price: 91674, original: 93368 },
			{ name: 'XIAOMI Redmi 15 (8GB RAM/256GB ROM)', img: 'photo-1598327105666-5b89351aff97', price: 201000, original: 206519 },
			{ name: 'XIAOMI Redmi PAD SE (8GB RAM/256GB ROM)', img: 'photo-1544244015-0df4b3ffc6b0', price: 224000, original: 255414 },
			{ name: 'XIAOMI Redmi Buds 6 Play - Black', img: 'photo-1590658268037-6bf12165a8df', price: 10488, original: 13488 },
			{ name: 'Redmi Watch 5 Active - Midnight Black', img: 'photo-1523275335684-37898b6baf30', price: 38524, original: 41524 },
			{ name: 'Redmi Watch 5 - Obsidian Black', img: 'photo-1523275335684-37898b6baf30', price: 121000, original: 132435 },
			{ name: '20000mah Powerbank - 33W White', img: 'photo-1609091839311-d5365f9ff1c5', price: 29999, original: 35122 },
		];
		
		for (let i = 0; i < 60; i++) {
			const template = xiaomiProducts[i % xiaomiProducts.length];
			products.push({
				id: 60 + i + 1,
				name: template.name,
				originalPrice: template.original,
				salePrice: template.price,
				discount: Math.round(((template.original - template.price) / template.original) * 100),
				image: `https://images.unsplash.com/${template.img}?w=400&h=400&fit=crop`,
				brand: 'XIAOMI'
			});
		}
		
		return products;
	};

	const defaultProducts: Product[] = generateProducts();

	interface iPage {
		type: 'cover' | 'products';
		products?: Product[];
		collection?: string;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	interface Product {
		id: number;
		name: string;
		originalPrice: number;
		salePrice: number;
		discount: number;
		image: string;
		brand?: string;
	}

	interface Props {
		products?: Product[];
		title?: string;
		subtitle?: string;
	}

	let {
		products = defaultProducts,
		title = 'JUMIA BLACK FRIDAY',
		subtitle = 'Do Pass Yourself'
	}: Props = $props();

	let currentSpread = $state(0);
	let isFlipping = $state(false);
	let isFullscreen = $state(false);
	let touchStartX = $state(0);
	let isMobile = $state(false);

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	const getPages = (): iPage[] => {
		const pages: iPage[] = [];
		pages.push({ type: 'cover' });

		const niveaProducts = products.filter((p) => p.brand === 'NIVEA');
		const xiaomiProducts = products.filter((p) => p.brand === 'XIAOMI');

		if (niveaProducts.length > 0) {
			for (let i = 0; i < niveaProducts.length; i += 9) {
				pages.push({
					type: 'products',
					products: niveaProducts.slice(i, i + 9),
					collection: 'Nivea - Platinum Collections'
				});
			}
		}

		if (xiaomiProducts.length > 0) {
			for (let i = 0; i < xiaomiProducts.length; i += 9) {
				pages.push({
					type: 'products',
					products: xiaomiProducts.slice(i, i + 9),
					collection: 'Xiaomi - Platinum Collections'
				});
			}
		}

		return pages;
	};

	const allPages = $derived(getPages());
	const totalPages = $derived(allPages.length);
	const totalSpreads = $derived(Math.ceil(totalPages / (isMobile ? 1 : 2)));
	const canGoBack = $derived(currentSpread > 0);
	const canGoForward = $derived(currentSpread < totalSpreads - 1);

	const getCurrentPages = (): (iPage | null)[] => {
		if (isMobile) {
			return [allPages[currentSpread]];
		} else {
			const leftIndex = currentSpread * 2;
			const rightIndex = leftIndex + 1;
			return [
				leftIndex < totalPages ? allPages[leftIndex] : null,
				rightIndex < totalPages ? allPages[rightIndex] : null
			].filter(Boolean);
		}
	};

	const currentPages = $derived(getCurrentPages());

	function nextPage() {
		if (canGoForward && !isFlipping) {
			isFlipping = true;
			setTimeout(() => {
				currentSpread++;
				setTimeout(() => {
					isFlipping = false;
				}, 800);
			}, 100);
		}
	}

	function prevPage() {
		if (canGoBack && !isFlipping) {
			isFlipping = true;
			setTimeout(() => {
				currentSpread--;
				setTimeout(() => {
					isFlipping = false;
				}, 800);
			}, 100);
		}
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartX - touchEndX;
		if (Math.abs(diff) > 75) {
			if (diff > 0) nextPage();
			else prevPage();
		}
	}

	function formatPrice(price: number): string {
		return `₦ ${price.toLocaleString()}`;
	}
</script>

<div class={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-black`}>
	<div class="min-h-screen p-2 text-white md:p-4">
		<div class="absolute right-2 top-2 z-50">
			<button
				onclick={() => (isFullscreen = !isFullscreen)}
				class="rounded-md border border-orange-500/30 bg-black/70 p-2 backdrop-blur-sm hover:bg-orange-500/20"
			>
				{#if isFullscreen}
					<svg class="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
					</svg>
				{:else}
					<svg class="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
					</svg>
				{/if}
			</button>
		</div>

		<div class="mx-auto max-w-[1600px]">
			<div
				class="page-flip-container relative"
				ontouchstart={handleTouchStart}
				ontouchend={handleTouchEnd}
				style="perspective: 2500px;"
			>
				<div class={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} relative gap-1`}>
					{#each currentPages as page, pageIndex}
						{@const isLeftPage = !isMobile && pageIndex === 0}
						{@const isRightPage = !isMobile && pageIndex === 1}

						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="page hand-cursor relative min-h-[600px] overflow-hidden rounded-lg bg-black shadow-2xl transition-all duration-700"
							class:flipping-forward={isFlipping && isRightPage}
							class:flipping-backward={isFlipping && isLeftPage}
							style="transform-style: preserve-3d;"
							onclick={() => isRightPage ? nextPage() : prevPage()}
						>
							{#if page?.type === 'cover'}
								<div class="relative flex h-full min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-700 p-8">
									<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] opacity-10"></div>

									<div class="relative z-10 text-center">
										<div class="mb-6 inline-flex items-center gap-2">
											<span class="text-5xl font-black md:text-6xl">JUMIA</span>
											<span class="text-5xl md:text-6xl">⭐</span>
										</div>

										<h1 class="mb-2 text-6xl font-black md:text-7xl">
											<span class="block">BLACK</span>
											<span class="block">FRIDAY</span>
										</h1>

										<div class="mb-4 inline-block rounded-full bg-black px-4 py-2 text-lg font-bold text-orange-400">
											31 OCT - 01 DEC
										</div>

										<h2 class="mb-4 text-3xl font-bold md:text-4xl">{subtitle}</h2>

										<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black">
											<span class="text-sm font-semibold">WITH UP TO</span>
											<span class="text-4xl font-black text-orange-600">60% OFF</span>
										</div>

										<div class="flex flex-wrap items-center justify-center gap-4">
											<span class="text-xs font-semibold text-white/80">POWERED BY</span>
											<span class="bg-blue-600 px-3 py-1 text-sm font-bold text-white rounded">NIVEA</span>
											<span class="bg-orange-500 px-3 py-1 text-sm font-bold text-white rounded">mi XIAOMI</span>
										</div>
									</div>
								</div>
							{:else if page?.type === 'products'}
								<div class="relative h-full min-h-[600px] bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 p-4 md:p-6">
									<div class="mb-4 flex items-center justify-between">
										<div class="flex-1">
											<div class="mb-2 inline-flex items-center gap-2">
												<span class="text-xl font-black md:text-2xl">JUMIA</span>
												<span class="text-xl md:text-2xl">⭐</span>
											</div>
										</div>
										<div class="rounded-lg bg-white px-3 py-1.5 md:px-4 md:py-2">
											<h2 class="whitespace-nowrap text-xs font-bold text-gray-900 md:text-sm">
												{page.collection}
											</h2>
										</div>
									</div>

									<div class="grid grid-cols-3 gap-2 md:gap-3">
										{#each page.products || [] as product}
											<div class="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl md:rounded-2xl">
												<div class="relative h-24 overflow-hidden bg-gray-50 md:h-32">
													<img
														src={product.image}
														alt={product.name}
														class="h-full w-full object-contain p-2 transition-transform duration-300 hover:scale-110 md:p-3"
													/>
												</div>
												<div class="flex flex-grow flex-col p-2 md:p-3">
													<h3 class="mb-1 line-clamp-2 min-h-[28px] text-[10px] font-medium leading-tight text-gray-900 md:mb-2 md:min-h-[32px] md:text-xs">
														{product.name}
													</h3>
													<div class="mt-auto">
														<div class="mb-1 rounded-md bg-orange-500 px-1.5 py-1 text-center text-white md:rounded-lg md:px-2 md:py-1.5">
															<div class="text-sm font-black leading-tight md:text-lg">
																{formatPrice(product.salePrice)}
															</div>
														</div>
														<div class="text-center text-[9px] text-gray-400 line-through md:text-xs">
															{formatPrice(product.originalPrice)}
														</div>
													</div>
												</div>
											</div>
										{/each}
									</div>

									<div class="absolute bottom-3 right-3 text-xs font-medium text-white/50">
										{currentSpread * (isMobile ? 1 : 2) + pageIndex + 1}/{totalPages}
									</div>
								</div>
							{/if}

							{#if !isMobile && isLeftPage}
								<div class="pointer-events-none absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l from-black/30 to-transparent"></div>
							{/if}
							{#if !isMobile && isRightPage}
								<div class="pointer-events-none absolute bottom-0 left-0 top-0 w-8 bg-gradient-to-r from-black/30 to-transparent"></div>
							{/if}
						</div>
					{/each}
				</div>

				{#if isFlipping}
					<div class="pointer-events-none absolute inset-0 bg-black/50 transition-opacity duration-300"></div>
				{/if}
			</div>

			<div class="mt-6 flex items-center justify-center gap-4">
				<button
					onclick={prevPage}
					disabled={!canGoBack || isFlipping}
					class="rounded-md border border-orange-500/30 bg-black/70 px-4 py-2 text-white backdrop-blur-sm hover:bg-orange-500/20 disabled:opacity-30"
				>
					<span class="text-sm">Previous</span>
				</button>

				<div class="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-black/70 px-4 py-2 backdrop-blur-sm">
					{#each Array(totalSpreads) as _, index}
						<button
							onclick={() => {
								if (!isFlipping) currentSpread = index;
							}}
							class="h-2 w-2 rounded-full transition-all {currentSpread === index
								? 'scale-125 bg-orange-500'
								: 'bg-gray-600 hover:bg-gray-500'}"
							aria-label={`Go to spread ${index + 1}`}
						></button>
					{/each}
				</div>

				<button
					onclick={nextPage}
					disabled={!canGoForward || isFlipping}
					class="rounded-md border border-orange-500/30 bg-black/70 px-4 py-2 text-white backdrop-blur-sm hover:bg-orange-500/20 disabled:opacity-30"
				>
					<span class="text-sm">Next</span>
				</button>
			</div>

			<div class="mt-3 text-center text-sm text-gray-400">
				{isMobile ? `Page ${currentSpread + 1}` : `Spread ${currentSpread + 1}`} of {totalSpreads}
			</div>
		</div>
	</div>
</div>

<style>
	.page-flip-container {
		perspective: 2500px;
		transform-style: preserve-3d;
	}
	
	.page {
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}
	
	.page.flipping-forward {
		animation: flipForward 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
	}
	
	.page.flipping-backward {
		animation: flipBackward 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
	}
	
	@keyframes flipForward {
		0% { transform: rotateY(0deg); }
		100% { transform: rotateY(-180deg); }
	}
	
	@keyframes flipBackward {
		0% { transform: rotateY(-180deg); }
		100% { transform: rotateY(0deg); }
	}
	
	.hand-cursor {
		cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>') 12 12, pointer;
	}
	
	@media (max-width: 768px) {
		.hand-cursor {
			cursor: pointer;
		}
	}
</style>