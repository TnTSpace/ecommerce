<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Progress } from '$lib/components/ui/progress';
	import {
		Utensils,
		Plus,
		Flame,
		Apple,
		Beef,
		Waves,
		CheckCircle2,
		AlertCircle,
		Info,
		ChevronRight,
		Clock
	} from '@lucide/svelte';
	import LogDialog from '../../(health-essentials)/dashboard/components/LogDialog.svelte';
	import { format } from 'date-fns';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	const mealLog = $derived(data.mealLogs || []);
	const dailyStats = $derived(
		data.dailyStats || {
			calories: { current: 0, target: 2000 },
			protein: { current: 0, target: 120 },
			carbs: { current: 0, target: 200 },
			fats: { current: 0, target: 70 },
			hydration: { current: 0, target: 8 }
		}
	);

	let logOpen = $state(false);
	let logType = $state('Meal');

	function handleLog(type: string) {
		logType = type;
		logOpen = true;
	}

	async function handleSuccess() {
		await invalidateAll();
	}
</script>

<div class="space-y-8 max-w-7xl mx-auto pb-12">
	<!-- Header -->
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Dietitian Support</h1>
			<p class="text-muted-foreground">
				Monitor your nutrition and receive expert medical feedback.
			</p>
		</div>
		<Button
			onclick={() => handleLog('Meal')}
			class="bg-primary hover:bg-primary/90 h-10 px-6 shadow-md shadow-primary/20"
		>
			<Plus class="mr-2 h-4 w-4" />
			Log New Meal
		</Button>
	</div>

	<!-- Stats Overview -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<Card.Root class="bg-card/60 backdrop-blur-md border-border/40">
			<Card.Content class="p-5 flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm text-muted-foreground capitalize font-bold tracking-widest">Calories</p>
					<h3 class="text-2xl font-bold">
						{dailyStats.calories.current}
						<span class="text-xs font-normal text-muted-foreground"
							>/ {dailyStats.calories.target}</span
						>
					</h3>
					<Progress
						value={(dailyStats.calories.current / dailyStats.calories.target) * 100}
						class="h-1.5 w-32 bg-primary/10"
					/>
				</div>
				<div class="p-3 bg-orange-500/10 rounded-xl">
					<Flame class="w-6 h-6 text-orange-500" />
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root class="bg-card/60 backdrop-blur-md border-border/40">
			<Card.Content class="p-5 flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm text-muted-foreground capitalize font-bold tracking-widest">Protein</p>
					<h3 class="text-2xl font-bold">
						{dailyStats.protein.current}g
						<span class="text-xs font-normal text-muted-foreground"
							>/ {dailyStats.protein.target}g</span
						>
					</h3>
					<Progress
						value={(dailyStats.protein.current / dailyStats.protein.target) * 100}
						class="h-1.5 w-32 bg-blue-500/10"
					/>
				</div>
				<div class="p-3 bg-blue-500/10 rounded-xl">
					<Beef class="w-6 h-6 text-blue-500" />
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root class="bg-card/60 backdrop-blur-md border-border/40">
			<Card.Content class="p-5 flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm text-muted-foreground capitalize font-bold tracking-widest">Carbs</p>
					<h3 class="text-2xl font-bold">
						{dailyStats.carbs.current}g
						<span class="text-xs font-normal text-muted-foreground"
							>/ {dailyStats.carbs.target}g</span
						>
					</h3>
					<Progress
						value={(dailyStats.carbs.current / dailyStats.carbs.target) * 100}
						class="h-1.5 w-32 bg-green-500/10"
					/>
				</div>
				<div class="p-3 bg-green-500/10 rounded-xl">
					<Apple class="w-6 h-6 text-green-500" />
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root class="bg-card/60 backdrop-blur-md border-border/40">
			<Card.Content class="p-5 flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm text-muted-foreground capitalize font-bold tracking-widest">
						Hydration
					</p>
					<h3 class="text-2xl font-bold">
						{dailyStats.hydration.current}L
						<span class="text-xs font-normal text-muted-foreground"
							>/ {dailyStats.hydration.target}.0L</span
						>
					</h3>
					<Progress
						value={(dailyStats.hydration.current / dailyStats.hydration.target) * 100}
						class="h-1.5 w-32 bg-cyan-500/10"
					/>
				</div>
				<Button
					class="p-3 bg-cyan-500/10 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition-colors"
					onclick={() => handleLog('Water')}
				>
					<Waves class="w-6 h-6 text-cyan-500" />
				</Button>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Main Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Meal Log -->
		<div class="lg:col-span-2 space-y-4">
			<h2 class="text-xl font-semibold flex items-center gap-2">
				<Clock class="w-5 h-5 text-primary" />
				Today's Meal Log
			</h2>

			<div class="space-y-3">
				{#each mealLog as meal}
					<Card.Root
						class="hover:bg-card/80 transition-colors border-border/40 overflow-hidden bg-card/40 backdrop-blur-sm"
					>
						<Card.Content class="p-4">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-4">
									<div
										class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
									>
										{#if meal.type === 'Breakfast'}
											<Apple class="w-6 h-6 text-primary" />
										{:else if meal.type === 'Lunch'}
											<Beef class="w-6 h-6 text-primary" />
										{:else}
											<Utensils class="w-6 h-6 text-primary" />
										{/if}
									</div>
									<div>
										<div class="flex items-center gap-2">
											<span class="text-xs font-bold text-muted-foreground capitalize"
												>{meal.type}</span
											>
											<span class="text-sm text-muted-foreground"
												>• {format(new Date(meal.createdAt), 'hh:mm a')}</span
											>
										</div>
										<h3 class="font-bold text-base">{meal.name}</h3>
										<p class="text-xs text-muted-foreground">
											{meal.calories} kcal • {meal.protein}g P • {meal.carbs}g C • {meal.fats}g F
										</p>
									</div>
								</div>
								<div class="flex flex-col items-end gap-1.5">
									{#if meal.accuracyConfirmed}
										<Badge
											class="bg-emerald-500/10 text-emerald-500 border-none text-sm capitalize tracking-tighter"
										>
											Verified Entry
										</Badge>
										<div class="flex items-center gap-1.5 text-sm font-bold text-green-500">
											<CheckCircle2 class="w-3 h-3" />
											Optimal Choice
										</div>
									{:else}
										<Badge
											class="bg-primary/10 text-primary border-none text-sm capitalize tracking-tighter hover:bg-primary/20"
										>
											Manual Log
										</Badge>
									{/if}
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				{:else}
					<div class="py-12 text-center border-2 border-dashed border-border/40 rounded-3xl">
						<Utensils class="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
						<p class="text-muted-foreground font-bold italic">No meals logged for today yet.</p>
						<Button
							variant="link"
							class="text-primary font-bold mt-2"
							onclick={() => handleLog('Meal')}
						>
							Start Logging
						</Button>
					</div>
				{/each}
			</div>

			<Button
				variant="ghost"
				class="w-full text-muted-foreground hover:text-primary transition-colors text-xs font-bold capitalize tracking-widest gap-2"
				href="/tracking/history"
			>
				View Full Weekly History <ChevronRight class="w-4 h-4" />
			</Button>
		</div>

		<!-- Dietitian Advice -->
		<div class="space-y-6">
			<Card.Root
				class="bg-linear-to-br from-primary/10 via-background/0 to-primary/5 border-primary/20 overflow-hidden"
			>
				<Card.Header>
					<Card.Title class=" flex items-center gap-2">
						<Info class="w-5 h-5 text-primary" />
						Expert Tip of the Day
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div
						class="p-4 bg-background/50 rounded-xl border border-primary/10 italic text-sm leading-relaxed text-foreground/90"
					>
						"Replacing refined carbohydrates with quinoa or brown rice can help stabilize blood
						glucose levels throughout the day for patients with Type 2 Diabetes."
					</div>
					<div class="flex items-center gap-3 pt-2">
						<Avatar.Root class="w-10 h-10 border border-primary/20">
							<Avatar.Fallback class="bg-primary/5 text-primary font-bold">CD</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<p class="text-xs font-bold">Our Clinical Dietitian</p>
							<p class="text-sm text-muted-foreground capitalize font-bold tracking-tighter">
								Clinical Dietitian
							</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="bg-card/40 border-border/40">
				<Card.Header>
					<Card.Title class="">Health Alert</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex gap-3 text-amber-500">
						<AlertCircle class="w-5 h-5 shrink-0" />
						<p class="text-sm font-medium leading-relaxed">
							Your sodium intake is nearing your daily limit. Try to avoid processed snacks for the
							remainder of the day.
						</p>
					</div>
					<Button
						variant="outline"
						class="w-full mt-4 border-amber-500/20 text-amber-600 hover:bg-amber-500/5 hover:text-amber-700 font-bold"
						onclick={() =>
							toast.info('Low-sodium dietary options feature coming soon in the next update!')}
					>
						View Low-Sodium Options
					</Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>

<LogDialog bind:open={logOpen} type={logType} onSuccess={handleSuccess} />
