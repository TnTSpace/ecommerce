<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type {
		Chart as ChartJS,
		ChartConfiguration,
		ChartData,
		ChartOptions,
		TooltipItem
	} from 'chart.js';
	import Wrap from '$lib/components/ui/wrap/wrap.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronsDownIcon, PointerIcon } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Card } from '$lib/components/ui/card';
	import GoogleDrive from '$lib/components/icons/google-drive.svelte';

	let efficiencyChartCanvas: HTMLCanvasElement;
	let scalabilityChartCanvas: HTMLCanvasElement;
	let strategicImpactChartCanvas: HTMLCanvasElement;
	let successMetricsChartCanvas: HTMLCanvasElement;

	const tooltipTitleCallback = (tooltipItems: TooltipItem<any>[]) => {
		const item = tooltipItems[0];
		let label = item.chart.data.labels?.[item.dataIndex];
		if (Array.isArray(label)) {
			return label.join(' ');
		}
		return label as string;
	};

	const wrapLabel = (str: string, maxWidth: number): string | string[] => {
		if (str.length <= maxWidth) {
			return str;
		}
		const words = str.split(' ');
		const lines: string[] = [];
		let currentLine = words[0];
		for (let i = 1; i < words.length; i++) {
			if (currentLine.length + words[i].length + 1 < maxWidth) {
				currentLine += ' ' + words[i];
			} else {
				lines.push(currentLine);
				currentLine = words[i];
			}
		}
		lines.push(currentLine);
		return lines;
	};

	onMount(() => {
		const commonChartOptions: ChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					callbacks: {
						title: tooltipTitleCallback
					}
				}
			}
		};

		const efficiencyData: ChartData<'bar'> = {
			labels: ['Manual Process', 'Jumia Analytics'],
			datasets: [
				{
					label: 'Time Taken',
					data: [480, 10],
					backgroundColor: ['#FF6B6B', '#06D6A0'],
					borderColor: ['#FF6B6B', '#06D6A0'],
					borderWidth: 1,
					barThickness: 50
				}
			]
		};
		const efficiencyConfig: ChartConfiguration<'bar'> = {
			type: 'bar',
			data: efficiencyData,
			options: {
				...commonChartOptions,
				indexAxis: 'y',
				plugins: {
					...commonChartOptions.plugins,
					legend: { display: false },
					title: {
						display: true,
						text: 'Average Time in Minutes for 100 Products'
					}
				},
				scales: {
					x: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Minutes'
						}
					}
				}
			}
		};
		new Chart(efficiencyChartCanvas, efficiencyConfig);

		const scalabilityData: ChartData<'doughnut'> = {
			labels: ['Currently Supported', 'Target Markets'],
			datasets: [
				{
					label: 'Jumia Markets',
					data: [9, 0],
					backgroundColor: ['#06D6A0', '#FFD166'],
					hoverOffset: 4
				}
			]
		};
		const scalabilityConfig: any = {
			type: 'doughnut',
			data: scalabilityData,
			options: {
				...commonChartOptions,
				plugins: {
					...commonChartOptions.plugins,
					legend: { position: 'top' },
					title: {
						display: true,
						text: 'Progress Towards Full Market Integration (9 Total)'
					}
				}
			}
		};
		new Chart(scalabilityChartCanvas, scalabilityConfig);

		const strategicImpactData: ChartData<'radar'> = {
			labels: [
				'Commercial Efficiency',
				'Cost Reduction',
				wrapLabel('Real-time Price Leadership', 16) as string[],
				'Pan-African Scalability',
				wrapLabel('Strategic Agility & Speed', 16) as string[]
			],
			datasets: [
				{
					label: 'Impact Score (out of 10)',
					data: [9, 8, 9, 10, 8],
					fill: true,
					backgroundColor: 'rgba(17, 138, 178, 0.2)',
					borderColor: '#118AB2',
					pointBackgroundColor: '#118AB2',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: '#118AB2'
				}
			]
		};
		const strategicImpactConfig: ChartConfiguration<'radar'> = {
			type: 'radar',
			data: strategicImpactData,
			options: {
				...commonChartOptions,
				plugins: {
					...commonChartOptions.plugins,
					legend: { display: false }
				},
				scales: {
					r: {
						angleLines: { color: 'rgba(7, 59, 76, 0.2)' },
						grid: { color: 'rgba(7, 59, 76, 0.2)' },
						pointLabels: { font: { size: 13 } },
						suggestedMin: 0,
						suggestedMax: 10,
						ticks: {
							backdropColor: 'rgba(0,0,0,0)',
							stepSize: 2
						}
					}
				}
			}
		};
		new Chart(strategicImpactChartCanvas, strategicImpactConfig);

		const successMetricsData: ChartData<'bar'> = {
			labels: [
				wrapLabel('Time Savings (Hours/Week)', 16) as string[],
				wrapLabel('Pricing Accuracy (Est. % Increase)', 16) as string[],
				wrapLabel('Campaign ROI (Est. % Increase)', 16) as string[],
				wrapLabel('Market Share (Est. % Growth)', 16) as string[]
			],
			datasets: [
				{
					label: 'Projected Impact',
					data: [40, 15, 10, 5],
					backgroundColor: ['#06D6A0', '#FFD166', '#118AB2', '#FF6B6B'],
					borderColor: ['#06D6A0', '#FFD166', '#118AB2', '#FF6B6B'],
					borderWidth: 1
				}
			]
		};
		const successMetricsConfig: ChartConfiguration<'bar'> = {
			type: 'bar',
			data: successMetricsData,
			options: {
				...commonChartOptions,
				plugins: {
					...commonChartOptions.plugins,
					legend: { display: false },
					title: {
						display: true,
						text: 'Key Success Metrics & Projected Gains'
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Value'
						}
					}
				}
			}
		};
		new Chart(successMetricsChartCanvas, successMetricsConfig);
	});
</script>

<Wrap class="mx-auto bg-jumia-lighter-bg py-8 dark:bg-background md:py-16">
	<header class="mb-16 text-center">
		<Badge class="tag mb-4 bg-yellow-800 text-yellow-100 dark:bg-yellow-100 dark:text-yellow-800"
			>Best Operational Efficiency AI Innovation</Badge
		>
		<h1 class="text-4xl font-black tracking-tight text-jumia-orange md:text-6xl">
			Jumia Analytics
		</h1>
		<p class="mx-auto mt-2 max-w-3xl text-xl font-light md:text-2xl">
			Enhancing Commercial Efficiency with AI-Powered Competitive Pricing
		</p>
	</header>

	<main class="space-y-20">
		<section id="problem">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					The Challenge: A Manual Bottleneck
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					In preparation for major campaigns, commercial teams faced a slow, inconsistent, and
					unscalable pricing process.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
				<div class="card border-t-4" style="border-color: #FF6B6B;">
					<div class="mb-4 text-4xl">😫</div>
					<h3 class="mb-2 text-xl font-bold">Manual Scraping</h3>
					<p class="text-muted-foreground">
						Competitor price checking required visiting each website individually, a tedious and
						error-prone task.
					</p>
				</div>
				<div class="card border-t-4" style="border-color: #FF6B6B;">
					<div class="mb-4 text-4xl">⏳</div>
					<h3 class="mb-2 text-xl font-bold">Inefficiency & Inconsistency</h3>
					<p class="text-muted-foreground">
						The process was labor-intensive and slow, leading to inconsistent pricing strategies
						across different markets.
					</p>
				</div>
				<div class="card border-t-4" style="border-color: #FF6B6B;">
					<div class="mb-4 text-4xl">📉</div>
					<h3 class="mb-2 text-xl font-bold">Scalability Issues</h3>
					<p class="text-muted-foreground">
						It was nearly impossible to perform checks simultaneously across Jumia’s numerous
						countries and categories.
					</p>
				</div>
			</div>
		</section>

		<section id="solution">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					The Solution: Jumia Analytics
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					An AI-powered, automated platform built to optimize price benchmarking in real time across
					all Jumia markets.
				</p>
			</div>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				<div class="card text-center">
					<span class="text-5xl">🔍</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">Jumia Product Search</h3>
					<p class="text-muted-foreground">
						Search by keyword, URL, or SKU list. Multi-market enabled for NG, CI, KE, and more.
					</p>
				</div>
				<div class="card text-center">
					<span class="text-5xl">⚙️</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">One-Click Scrape</h3>
					<p class="text-muted-foreground">
						Automated scraping of prices from local competitors’ websites for selected products.
					</p>
				</div>
				<div class="card text-center">
					<span class="text-5xl">📊</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">Statistics Dashboard</h3>
					<p class="text-muted-foreground">
						Tracks scrape performance in real time, showing successes, failures, and total counts.
					</p>
				</div>
				<div class="card text-center">
					<span class="text-5xl">📤</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">Seamless Export</h3>
					<p class="text-muted-foreground">
						Export data to Google Sheets or CSV for immediate use in campaign pricing setup.
					</p>
				</div>
			</div>
		</section>

		<section id="workflow">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">Workflow Transformation</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					From a multi-day manual slog to a streamlined, few-minute automated process.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				<div
					class="card flex flex-col items-center justify-center gap-2 bg-white p-8 dark:bg-red-500/10"
				>
					<h3 class="mb-6 text-center text-2xl font-bold" style="color: #FF6B6B;">
						Before: The Manual Process
					</h3>
					<div
						class="relative w-full rounded-md border-2 p-4 text-center"
						style="border-color: #FF6B6B; color: #FF6B6B;"
					>
						Extract Jumia Products
					</div>
					<ChevronsDownIcon class="text-[#FF6B6B]" />
					<div
						class="relative w-full rounded-md border-2 p-4 text-center"
						style="border-color: #FF6B6B; color: #FF6B6B;"
					>
						Visit Competitor Sites
					</div>
					<ChevronsDownIcon class="text-[#FF6B6B]" />
					<div
						class="relative w-full rounded-md border-2 p-4 text-center"
						style="border-color: #FF6B6B; color: #FF6B6B;"
					>
						Manually Compare Prices
					</div>
					<ChevronsDownIcon class="text-[#FF6B6B]" />
					<div
						class="relative w-full rounded-md border-2 p-4 text-center"
						style="border-color: #FF6B6B; color: #FF6B6B;"
					>
						Adjust Pricing Strategy
					</div>
				</div>
				<div
					class="card flex flex-col items-center justify-center gap-2 bg-white p-8 dark:bg-green-500/10"
				>
					<h3 class="mb-6 text-center text-2xl font-bold text-green-800 dark:text-[#06D6A0]">
						After: AI-Powered Automation
					</h3>
					<div
						class="relative w-full rounded-md border-2 border-green-800 p-4 text-center text-green-800 dark:border-[#06D6A0] dark:text-[#06D6A0]"
					>
						Select Product(s)
					</div>
					<ChevronsDownIcon class="text-green-800 dark:text-[#06D6A0]" />
					<div
						class="relative w-full rounded-md border-2 border-green-800 p-4 text-center text-green-800 dark:border-[#06D6A0] dark:text-[#06D6A0]"
					>
						Click "Find" & "Scrape"
					</div>
					<ChevronsDownIcon class="text-green-800 dark:text-[#06D6A0]" />
					<div
						class="relative w-full rounded-md border-2 border-green-800 p-4 text-center text-green-800 dark:border-[#06D6A0] dark:text-[#06D6A0]"
					>
						Monitor Scrape Status
					</div>
					<ChevronsDownIcon class="text-green-800 dark:text-[#06D6A0]" />
					<div
						class="relative w-full rounded-md border-2 border-green-800 p-4 text-center text-green-800 dark:border-[#06D6A0] dark:text-[#06D6A0]"
					>
						Export Results
					</div>
				</div>
			</div>
		</section>

		<section id="pitch">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					Our Pitch: Revolutionizing Pricing Intelligence
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					Jumia Analytics is not just a tool; it's a strategic imperative that will redefine our
					market position and operational agility.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div class="card md:col-span-2">
					<h3 class="mb-4 text-xl font-bold">What Business Problem is Being Solved?</h3>
					<p class="text-muted-foreground">
						The core problem is the immense inefficiency and lack of real-time intelligence in our
						competitive pricing strategy. Manual processes lead to missed opportunities,
						inconsistent pricing, and significant resource drain. Jumia Analytics eliminates this
						bottleneck, ensuring we are always price-competitive and agile.
					</p>
				</div>
				<div class="card">
					<h3 class="mb-4 text-xl font-bold">Who Are the Users?</h3>
					<p class="text-muted-foreground">
						Our primary users are Jumia's commercial teams, including category managers, pricing
						analysts, and campaign planners. They are the frontline decision-makers who need
						immediate, accurate competitive insights. Ultimately, the biggest beneficiaries are our
						customers, who gain access to the best prices, fostering trust and loyalty.
					</p>
				</div>
				<div class="card">
					<h3 class="mb-4 text-xl font-bold">What Data Will We Require?</h3>
					<p class="text-muted-foreground">
						The system primarily requires access to Jumia's product SKU database and the publicly
						available HTML structures of competitor websites across our operating markets. No
						sensitive or private data is collected, ensuring full compliance and security.
					</p>
				</div>
				<div class="card md:col-span-2">
					<h3 class="mb-4 text-xl font-bold">How Can We Evaluate Success (Metrics)?</h3>
					<p class="mb-4 text-muted-foreground">
						Success will be measured by several key metrics, demonstrating tangible improvements in
						our operations and market standing.
					</p>
					<div class="chart-container h-80 md:h-96">
						<canvas bind:this={successMetricsChartCanvas}></canvas>
					</div>
				</div>
				<div class="card flex flex-col gap-2 md:col-span-2">
					<h3 class="mb-4 text-xl font-bold">
						Is the Solution Scalable and Deployable in Jumia's Environment?
					</h3>
					<p class="text-muted-foreground">
						Absolutely. Built with a modular architecture (Svelte frontend, custom scraping engine,
						Google Gemini AI integration), Jumia Analytics is designed for pan-African scale. It
						runs in standard cloud environments (e.g., AWS, Vercel) and leverages APIs for seamless
						integration. The existing prototype demonstrates its immediate deployability and
						impressive results, making it a perfect fit for Jumia's tech ecosystem. What's required
						to scale for multiple users at the same time is to obtain a payment plan for <a
							class="text-primary underline"
							href="https://vercel.com/pricing">vercel ($20/month) hosting</a
						>
						& data scraping platforms like:
						<a href="https://scrapeops.io/proxy-api-aggregator/" class="text-primary underline"
							>Scrapeops Proxy Aggregator ($249/month)</a
						>
						or
						<a href="https://brightdata.com/pricing/scraping-browser" class="text-primary underline"
							>Bright Data Scraping Browser ($449/month)</a
						>
					</p>
					<img src="/vercel.png" class="rounded-lg" alt="vercel" />
					<img src="/scrapeops.png" class="rounded-lg" alt="scrape ops" />
					<img src="/brightdata.png" class="rounded-lg" alt="bright data" />
				</div>
				<div class="card md:col-span-2">
					<h3 class="mb-4 text-xl font-bold">Discovery & Trust Building</h3>
					<p class="text-muted-foreground">
						By guaranteeing price leadership and real-time competitiveness, Jumia Analytics directly
						enhances product discovery for our customers. When customers consistently find the best
						prices on Jumia, it builds immense trust and strengthens their loyalty, driving repeat
						purchases and overall platform growth. This fosters a virtuous cycle: better prices
						attract more customers, leading to higher sales volumes and further strengthening
						Jumia's market position.
					</p>
				</div>
			</div>
		</section>

		<section id="impact">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					A Paradigm Shift in Efficiency & Strategy
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					The tool's impact goes beyond time savings, enabling smarter, faster commercial decisions.
				</p>
			</div>

			<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
				<Card
					class="card grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] bg-white p-4 dark:bg-secondary"
				>
					<h3 class="mb-4 text-center text-xl font-bold">Efficiency Gains: Hours vs. Minutes</h3>
					<p class="mb-4 text-center text-muted-foreground">
						The tool drastically reduces the time spent on competitive analysis, freeing up teams
						for higher-value strategic tasks.
					</p>
					<div class="chart-container">
						<canvas bind:this={efficiencyChartCanvas}></canvas>
					</div>
				</Card>
				<Card
					class="card grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] bg-white p-4 dark:bg-secondary">
					<h3 class="mb-4 text-center text-xl font-bold">Pan-African Scalability</h3>
					<p class="mb-4 text-center text-muted-foreground">
						Designed to support all 9 Jumia markets, Jumia Analytics ensures consistent price
						leadership across the continent.
					</p>
					<div class="chart-container">
						<canvas bind:this={scalabilityChartCanvas}></canvas>
					</div>
				</Card>
				<div class="card md:col-span-2">
					<h3 class="mb-4 text-center text-xl font-bold">Holistic Strategic Benefits</h3>
					<p class="mx-auto mb-4 max-w-2xl text-center text-muted-foreground">
						Jumia Analytics strengthens core business pillars, from operational excellence to
						tech-driven market leadership.
					</p>
					<div class="chart-container h-96 md:h-[450px]">
						<canvas bind:this={strategicImpactChartCanvas}></canvas>
					</div>
				</div>
			</div>
		</section>

		<section id="tech">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">AI-Powered Implementation</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					A modern tech stack designed for performance, scalability, and intelligence.
				</p>
			</div>
			<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
				<div class="card">
					<h4 class="mb-2 text-lg font-bold">Product Name Optimization</h4>
					<p>
						Google Gemini AI shortens long product names to 4-word keyword-effective queries,
						dramatically improving match rates on competitor sites.
					</p>
				</div>
				<div class="card">
					<h4 class="mb-2 text-lg font-bold">Web Scraping Engine</h4>
					<p>
						Custom, country-specific scripts are optimized for each competitor's unique domain and
						HTML structure, ensuring high data accuracy.
					</p>
				</div>
				<div class="card">
					<h4 class="mb-2 text-lg font-bold">Responsive Frontend</h4>
					<p>
						Built with Svelte, the interface is exceptionally fast and fully responsive, providing a
						seamless experience on any device.
					</p>
				</div>
				<div class="card">
					<h4 class="mb-2 text-lg font-bold">Flexible Data Handling</h4>
					<p>
						Integrated Google Sheets API and CSV logic provide teams with the data in the format
						they need for their campaign workflows.
					</p>
				</div>
			</div>
		</section>

		<footer class="mt-12 border-t pt-12 text-center">
			<h2 class="text-3xl font-bold text-jumia-orange">Ready to Revolutionize Pricing?</h2>
			<p class="mt-2 text-lg text-muted-foreground">
				Explore the prototype and see the tool in action.
			</p>
			<div class="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
				<Button variant="outline" href="https://drive.google.com/drive/folders/1OtkGuDBhwVloZzSG9JVf4Ib1oBaSSXSC?usp=sharing" target="_blank">
					<GoogleDrive />
					<span>Code</span>
				</Button>
				<Button href="/competition" target="_blank">
					<span>View Prototype</span>
					<PointerIcon class="rotate-90" />
				</Button>
			</div>
			<p class="mt-12 text-sm text-gray-500">
				&copy; {new Date().getFullYear()} Jumia. All rights reserved.
			</p>
		</footer>
	</main>
</Wrap>
