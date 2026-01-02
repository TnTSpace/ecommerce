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
	// Assuming these imports are correctly configured for your SvelteKit/Shadcn setup
	import Wrap from '$lib/components/ui/wrap/wrap.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PointerIcon } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Card } from '$lib/components/ui/card';
	import GoogleDrive from '$lib/components/icons/google-drive.svelte';
	import ChallengesCarousel from './components/ChallengesCarousel.svelte'; // Assuming this component is updated to reflect new challenges

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

		// Efficiency Chart: Time comparison (Dataweave vs Phoenix Tracker)
		const efficiencyData: ChartData<'bar'> = {
			labels: ['Current (Dataweave)', 'Phoenix Tracker (n8n)'],
			datasets: [
				{
					label: 'Time to Acquire Data (Minutes)',
					data: [120, 5], // Example: Dataweave might take 2 hours for comprehensive data, Phoenix Tracker 5 minutes
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
						text: 'Time Efficiency for Key Campaign Pricing Data'
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
		// new Chart(efficiencyChartCanvas, efficiencyConfig);

		// Scalability Chart: Markets supported (assuming Phoenix Tracker will cover all 9)
		const scalabilityData: ChartData<'doughnut'> = {
			labels: ['Markets Covered by Phoenix Tracker', 'Remaining Markets'],
			datasets: [
				{
					label: 'Jumia Markets',
					data: [1, 8], // Assuming Phoenix Tracker will cover all 9 Jumia markets
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
						text: 'Jumia Markets Supported by Phoenix Tracker (9 Total)'
					}
				}
			}
		};
		new Chart(scalabilityChartCanvas, scalabilityConfig);

		// Strategic Impact Chart: Radar chart for broader benefits
		const strategicImpactData: ChartData<'radar'> = {
			labels: [
				wrapLabel('Cost Optimization', 16) as string[],
				'Real-time Price Leadership',
				wrapLabel('Operational Independence', 16) as string[],
				'Pan-African Scalability',
				wrapLabel('Strategic Agility & Speed', 16) as string[]
			],
			datasets: [
				{
					label: 'Impact Score (out of 10)',
					data: [9, 9, 8, 10, 8],
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

		// Success Metrics Chart: Financial savings and key gains
		const successMetricsData: ChartData<'bar'> = {
			labels: [
				wrapLabel('Current (Dataweave)', 16) as string[], // Explicitly USD
				wrapLabel('Phoenix Tracker (n8n)', 16) as string[]
			],
			datasets: [
				{
					label: 'Projected Impact',
					data: [167000, 3000], // 170,000 - 3,000 = 167,000 USD savings
					backgroundColor: ['#06D6A0', '#FFD166'],
					borderColor: ['#06D6A0', '#FFD166'],
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
						text: 'Projected Gains'
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Value'
						},
						ticks: {
							callback: function (value) {
								// Format for currency if it's the first label, otherwise just number
								if (this.getLabelForValue(value as number) === 'Annual Cost Savings (USD)') {
									return '$' + value.toLocaleString();
								}
								return value.toLocaleString();
							}
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
			A warehouse of AI-powered tools designed to replace expensive commercial licenses and
			significantly cut operational costs.
		</p>
	</header>

	<main class="space-y-20">
		<!-- Problem & Enhanced Solution -->
		<section id="problem-solution">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					The Problem: High Costs & Limitations of Current Pricing Intelligence
				</h2>
				<p class="mx-auto mt-2 max-w-4xl text-lg text-muted-foreground">
					While we currently leverage platforms like <Button href="https://dataweave.com/" target="_blank" variant="link" class="px-0 text-lg">Dataweave</Button> for competitive
					pricing, the recurring
					<strong
						>licensing costs are substantial, and the data acquisition can still be inflexible, delayed, or sometimes inaccurate for our dynamic campaign needs. This directly impacts our "Phoenix Price" leadership
							during critical Tier 1 campaigns.
						</strong>
				</p>
				<blockquote class="quote text-left">
					“We have a lot of tools and our pricing is always more expensive.”
				</blockquote>
			</div>

			<div class="grid grid-cols-1">
				<ChallengesCarousel />
			</div>

			<div class="mb-12 mt-20 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					The Jumia Analytics Solution: Phoenix Tracker - Our First AI-Powered Tool
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					<strong>Phoenix Tracker</strong> is the inaugural tool in the Jumia Analytics warehouse.
					It's an <strong>n8n AI and Automation workflow</strong> built to replace costly external licenses,
					starting with our competitive pricing intelligence.
				</p>
			</div>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				<Card class="card text-center">
					<span class="text-5xl">🧠</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">AI-Driven Product Matching</h3>
					<p class="text-muted-foreground">
						<strong>Google Gemini AI</strong> intelligently optimizes product names into concise, effective
						search queries, significantly improving the accuracy of competitor product matching.
					</p>
				</Card>
				<Card class="card text-center">
					<span class="text-5xl">⚡</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">Automated Real-time Scraping (n8n)</h3>
					<p class="text-muted-foreground">
						Our <strong>self-hosted n8n workflow</strong> automates the scraping of competitor
						prices on a scheduled basis, ensuring we always have the latest Phoenix prices,
						<strong>without recurring software licensing fees.<strong> </strong></strong>
					</p>
				</Card>
				<Card class="card text-center">
					<span class="text-5xl">📊</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">Live Data to Google Sheets</h3>
					<p class="text-muted-foreground">
						Automatically writes real-time pricing data to Google Sheets, providing commercial teams
						with immediate, actionable insights for dynamic pricing adjustments.
					</p>
				</Card>
				<Card class="card text-center">
					<span class="text-5xl">📈</span>
					<h3 class="mb-2 mt-4 text-xl font-bold">Strategic Price Leadership</h3>
					<p class="text-muted-foreground">
						Enables Jumia to maintain aggressive pricing strategies and achieve "Phoenix Price"
						leadership during critical campaigns, maximizing sales and market share.
					</p>
				</Card>
			</div>
			<div class="mt-8 grid grid-cols-1 gap-8">
				<div class="flex flex-col gap-2">
					<h3 class="mb-2 text-xl font-bold">No-Code Prototype (n8n & Gemini AI)</h3>
					<a
						href="https://olanrewajuibironke.app.n8n.cloud/workflow/WplSI1Ew44WukgHq"
						target="_blank"
						class="block"
					>
						<img
							src="/ng-workflow-no-code.png"
							alt="no code prototype"
							class="aspect-video w-full rounded-lg object-cover"
						/>
					</a>
				</div>
				<!-- <div class="flex flex-col gap-2">
					<h3 class="mb-2 text-xl font-bold">Code Prototype (SvelteKit & Gemini AI)</h3>
					<a href="https://jumia-analytics.vercel.app/competition" target="_blank" class="block">
						<img
							src="/ng-workflow-code.png"
							alt="code prototype"
							class="aspect-video w-full rounded-lg object-cover"
						/>
					</a>
				</div> -->
			</div>
		</section>

		<!-- Detailed Impact & Value -->
		<section id="detailed-impact" class="flex flex-col gap-4">
			<div class="text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					Detailed Impact & Tangible Value for Jumia
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					Jumia Analytics, starting with Phoenix Tracker, delivers measurable benefits across
					operational efficiency, customer satisfaction, and revenue generation, <strong
						>all while significantly cutting costs.</strong
					>
				</p>
			</div>

			<div class="text-center">
				<p class="text-2xl font-bold text-green-600">
					Current Dataweave Annual License: <span class="text-red-600 line-through"
						>$170,000 USD</span
					>
				</p>
				<p class="mt-2 text-2xl font-bold text-green-600">
					Phoenix Tracker (Scrapeops Proxy): <span class="text-green-800">$3,000 USD per year</span>
				</p>
				<p class="mt-4 text-3xl font-extrabold text-blue-800">
					Projected Annual Savings: <span class="text-green-700">$167,000 USD!</span>
				</p>
			</div>
			<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
				<Card
					class="card grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] bg-white p-4 dark:bg-secondary"
				>
					<h3 class="mb-4 text-center text-xl font-bold">Massive Annual Cost Savings</h3>
					<p class="mb-4 text-center text-muted-foreground">
						By replacing expensive third-party licenses with our in-house, self-hosted automation,
						Jumia will achieve substantial annual savings on operational tools, starting with
						competitive pricing.
					</p>
					<div class="chart-container">
						<canvas bind:this={successMetricsChartCanvas}></canvas>
					</div>
				</Card>
				<Card
					class="card grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] bg-white p-4 dark:bg-secondary"
				>
					<h3 class="mb-4 text-center text-xl font-bold">
						Strategic Independence & Pan-African Scalability
					</h3>
					<p class="mx-auto mb-4 max-w-2xl text-center text-muted-foreground">
						Gaining control over our data acquisition process allows for faster adaptation to market
						changes and ensures consistent price leadership across all 9 Jumia markets, fostering
						long-term strategic agility and reducing vendor lock-in.
					</p>

					<div class="chart-container">
						<canvas bind:this={scalabilityChartCanvas}></canvas>
					</div>
					<!-- <div class="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
						<div class="chart-container">
							<canvas bind:this={scalabilityChartCanvas}></canvas>
						</div>
						<div class="chart-container">
							<canvas bind:this={strategicImpactChartCanvas}></canvas>
						</div>
					</div> -->
				</Card>
				<Card class="card md:col-span-2">
					<h3 class="mb-4 text-xl font-bold">Enhanced Customer Trust & Loyalty</h3>
					<p class="text-muted-foreground">
						By consistently offering the best "Phoenix Prices" during crucial campaigns, Jumia
						Analytics Phoenix Tracker directly enhances product discovery for our customers. When
						customers consistently find competitive prices on Jumia, it builds immense <strong
							>trust</strong
						> and strengthens their loyalty, driving repeat purchases and overall platform growth. This
						ensures Jumia remains the preferred shopping destination, vital for long-term customer relationships.
					</p>
				</Card>
			</div>
		</section>

		<!-- Feasibility & Implementation Insights -->
		<section id="feasibility">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					Feasibility & Implementation Insights
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					Jumia Analytics is built on a robust, scalable architecture with clear data requirements
					and a straightforward deployment path, <strong
						>offering a powerful, cost-effective alternative to current solutions.</strong
					>
				</p>
			</div>
			<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
				<Card class="card">
					<h4 class="mb-2 text-lg font-bold">What Business Problem is Being Solved?</h4>
					<p class="text-muted-foreground">
						The primary business problem is the <strong>high operational expenditure</strong>
						associated with third-party competitive pricing intelligence platforms like Dataweave. While
						these tools provide data, their recurring licensing fees significantly impact our profitability
						and limit our agility in dynamically responding to market changes. Jumia Analytics Phoenix
						Tracker solves this by providing a
						<strong
							>cost-efficient, internally controlled, and highly customizable alternative.
						</strong>
					</p>
				</Card>
				<Card class="card">
					<h4 class="mb-2 text-lg font-bold">Who Are the Users?</h4>
					<p class="text-muted-foreground">
						The primary users are Jumia's <strong
							>commercial teams, including Category Managers, Pricing Analysts, and Campaign
							Planners, who require real-time competitive data for strategic decision-making.
							Indirectly, our customers are key beneficiaries, as optimized pricing leads to better
							deals and enhanced trust in Jumia.
						</strong>
					</p>
				</Card>
				<Card class="card">
					<h4 class="mb-2 text-lg font-bold">What Data Will We Require?</h4>
					<p class="text-muted-foreground">
						The system requires Jumia's product SKUs and publicly accessible website structures of
						our competitors. It is crucial to note that <strong
							>no sensitive or private customer data is collected, ensuring full compliance with
							data privacy regulations and security standards.
						</strong>
					</p>
				</Card>
				<Card class="card">
					<h4 class="mb-2 text-lg font-bold">How Can We Evaluate Success (Metrics)?</h4>
					<div class="text-muted-foreground">
						<p>Success will be rigorously measured by:</p>
						<ul class="mt-2 list-disc pl-5">
							<li>
								<strong>Direct Cost Savings:</strong> Reduction in annual licensing fees (e.g., Dataweave
								replacement by Phoenix Tracker).
							</li>
							<li>
								<strong>Pricing Agility:</strong> Speed of pricing updates and responsiveness to competitor
								changes.
							</li>
							<li>
								<strong>Campaign ROI:</strong> Measured by increased sales volume and conversion rates
								during campaigns leveraging the tool.
							</li>
							<li>
								<strong>Market Share Gains:</strong> Long-term impact on our competitive positioning.
							</li>
							<li>
								<strong>Operational Efficiency:</strong> Time saved by commercial teams, allowing focus
								on strategic tasks.
							</li>
						</ul>
					</div>
				</Card>
				<Card class="card md:col-span-2">
					<h4 class="mb-2 text-lg font-bold">
						Is the Solution Scalable and Deployable in Jumia's Environment?
					</h4>
					<div class="text-muted-foreground">
						<p>
							Absolutely. Jumia Analytics is designed for <strong>pan-African scale</strong> and seamless
							integration into Jumia's existing tech ecosystem.
						</p>
						<ul class="mt-2 list-disc pl-5">
							<li>
								<strong>Self-Hosted n8n:</strong> The automation workflow is self-deployable on Jumia
								servers, incurring zero software licensing costs for the core automation platform.
							</li>
							<li>
								<strong>Cloud-Native & API-Driven:</strong> The frontend (Svelte) and backend logic can
								run in standard cloud environments (e.g., AWS, Vercel) and leverage existing APIs.
							</li>
							<li>
								<strong>Proxy Service for Scale:</strong> To handle large-scale scraping for multiple
								users and markets, the primary external cost is a dedicated proxy service like Scrapeops
								Proxy Aggregator (~$249/month, or $3,000/year), a fraction of previous vendor costs.
								This provides robust IP rotation and bypasses without relying on a full-service vendor.
							</li>
							<li>
								<strong>Proven Prototype:</strong> The existing prototypes (n8n workflow and SvelteKit
								frontend) demonstrate immediate deployability and impressive results within Jumia's environment.
							</li>
						</ul>
						<p>
							This approach offers a <strong>highly cost-effective and powerful solution</strong> for
							large-scale operations while maintaining internal control.
						</p>
					</div>
				</Card>
			</div>
			<div class="mt-8 grid grid-cols-1 gap-8">
				<a href="https://dataweave.com/" target="_blank" class="block">
					<img src="/dataweave.png" alt="Dataweave Logo" class="aspect-auto w-full rounded-lg" />
					<p class="mt-2 text-center text-sm text-muted-foreground">
						Dataweave: Our current, more expensive solution.
					</p>
				</a>
				<a href="https://scrapeops.io/proxy-api-aggregator/" target="_blank" class="block">
					<img src="/scrapeops.png" alt="Scrapeops Logo" class="aspect-auto w-full rounded-lg" />
					<p class="mt-2 text-center text-sm text-muted-foreground">
						Scrapeops: The cost-effective proxy solution for Jumia Analytics Phoenix Tracker.
					</p>
				</a>
				<a href="https://n8n.io/pricing/" target="_blank" class="block">
					<img src="/n8n-selfhosting.png" alt="n8n pricing" class="aspect-auto w-full rounded-lg" />
					<p class="mt-2 text-center text-sm text-muted-foreground">
						n8n Self-Hosting: Zero software licensing costs for our automation.
					</p>
				</a>
			</div>
		</section>

		<!-- Compelling Story / Vision -->
		<section id="compelling-story">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-jumia-orange md:text-4xl">
					Our Vision: A New Era of Pricing Intelligence at Jumia
				</h2>
				<p class="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
					Jumia Analytics is more than just a tool; it's a strategic imperative that will redefine
					our market position and operational agility, directly impacting our ability to win during
					crucial campaigns and <strong
						>unlocking significant cost efficiencies.<strong> </strong></strong
					>
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<Card class="card md:col-span-2">
					<h3 class="mb-4 text-xl font-bold">
						Why This Matters: Revolutionizing Campaign Success & Maximizing ROI
					</h3>
					<p class="text-muted-foreground">
						The battle for customers during our Tier 1 campaigns is won and lost on price. By
						equipping our commercial teams with <strong>live, accurate Phoenix prices</strong> at a
						fraction of the current cost, Jumia Analytics Phoenix Tracker ensures we can make rapid,
						data-driven pricing adjustments. This isn't just about efficiency; it's about achieving
						our sales targets, dominating key product categories, and significantly strengthening
						Jumia's competitive edge in the African e-commerce landscape. This allows us to pivot
						from reactive price adjustments to proactive, real-time price leadership,
						<strong>all while minimizing operational overhead.</strong>
					</p>
				</Card>
				<Card class="card md:col-span-2">
					<h3 class="mb-4 text-center text-xl font-bold">Holistic Strategic Benefits</h3>
					<p class="mx-auto mb-4 max-w-2xl text-center text-muted-foreground">
						Jumia Analytics Phoenix Tracker strengthens core business pillars, from operational
						excellence to tech-driven market leadership, <strong
							>with a clear path to cost optimization.</strong
						>
					</p>
					<div class="chart-container h-96 md:h-[450px]">
						<canvas bind:this={strategicImpactChartCanvas}></canvas>
					</div>
				</Card>
			</div>
		</section>

		<footer class="mt-12 border-t pt-12 text-center">
			<h2 class="text-3xl font-bold text-jumia-orange">Ready to Revolutionize Pricing?</h2>
			<p class="mt-2 text-lg text-muted-foreground">
				Explore the prototypes and see the power of Jumia Analytics Phoenix Tracker in action.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
				<Button
					variant="outline"
					href="https://drive.google.com/drive/folders/1OtkGuDBhwVloZzSG9JVf4Ib1oBaSSXSC?usp=sharing"
					target="_blank"
				>
					<GoogleDrive class="mr-2 h-5 w-5" />
					<span>Code & Workflow</span>
				</Button>
				<!-- <Button href="/competition" target="_blank">
					<span>View Prototype</span>
					<PointerIcon class="ml-2 h-4 w-4 rotate-90" />
				</Button> -->
			</div>
			<p class="mt-12 text-sm text-gray-500">
				&copy; {new Date().getFullYear()} Jumia. All rights reserved.
			</p>
		</footer>
	</main>
</Wrap>

<style>
	/* Global styles for body and dark mode */
	:global(body) {
		font-family: 'Inter', sans-serif;
		background-color: #f0f4f8;
		color: #073b4c; /* Dark Blue from palette */
	}
	:global(.dark body) {
		background-color: #1a1a1a; /* Darker background for dark mode */
		color: #e0e0e0;
	}

	/* Card styling */
	.card {
		background-color: white;
		border-radius: 0.75rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		padding: 1.5rem;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	:global(.dark .card) {
		background-color: #2a2a2a; /* Darker card background for dark mode */
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.3),
			0 4px 6px -2px rgba(0, 0, 0, 0.15);
	}
	.card:hover {
		transform: translateY(-5px);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	/* Chart container specific styling */
	.chart-container {
		position: relative;
		width: 100%;
		max-width: 500px; /* Constrain max width for readability */
		margin-left: auto;
		margin-right: auto;
		height: 320px; /* Base height */
		max-height: 400px; /* Max height to prevent excessive vertical stretch */
	}
	@media (min-width: 768px) {
		.chart-container {
			height: 350px; /* Adjust height for larger screens */
		}
	}

	/* Badge/Tag styling */
	.tag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-weight: 500;
		font-size: 0.875rem;
	}

	/* Quote styling */
	.quote {
		font-style: italic;
		font-size: 1.25rem;
		color: #ff9900; /* Vibrant blue for emphasis */
		margin-top: 1rem;
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		padding: 0.5rem 1rem;
		border-left: 4px solid #ff9900; /* Green accent */
	}
</style>
