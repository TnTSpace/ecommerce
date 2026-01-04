<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Droplets,
		UtensilsCrossed,
		Dumbbell,
		Heart,
		Weight,
		Smile,
		Save,
		Loader2
	} from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	let {
		open = $bindable(false),
		type = $bindable('Water'),
		onSuccess
	} = $props<{
		open: boolean;
		type: string;
		onSuccess?: () => void;
	}>();

	let loading = $state(false);

	const icons: Record<string, any> = {
		Water: Droplets,
		Meal: UtensilsCrossed,
		Workout: Dumbbell,
		Vitals: Heart,
		Weight: Weight,
		Mood: Smile
	};

	const colors: Record<string, string> = {
		Water: 'text-blue-500',
		Meal: 'text-green-500',
		Workout: 'text-orange-500',
		Vitals: 'text-red-500',
		Weight: 'text-purple-500',
		Mood: 'text-yellow-500'
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="sm:max-w-[425px] border-border/40 bg-background/80 backdrop-blur-3xl shadow-2xl"
	>
		<Dialog.Header>
			<div class="flex items-center gap-4 mb-2">
				<div class="p-3 bg-transparent border border-border/40">
					{#if icons[type]}
						{@const Icon = icons[type]}
						<Icon class="w-6 h-6 {colors[type]}" />
					{/if}
				</div>
				<div>
					<Dialog.Title class="text-2xl font-bold">Log {type}</Dialog.Title>
					<Dialog.Description class="font-medium"
						>Track your {type.toLowerCase()} for better health insights.</Dialog.Description
					>
				</div>
			</div>
		</Dialog.Header>

		{#if type === 'Water'}
			<form
				method="POST"
				action="?/logWater"
				use:enhance={() => {
					loading = true;
					return ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							toast.success('Water logged successfully!');
							open = false;
							onSuccess?.();
						}
					};
				}}
				class="space-y-6 py-4"
			>
				<div class="space-y-2">
					<Label for="amount" class="font-bold ml-1">Amount (ml)</Label>
					<div class="flex items-center gap-3">
						<Input
							id="amount"
							name="amount"
							type="number"
							value="250"
							class="h-12 bg-background border-border/40 font-bold"
						/>
						<span class="font-bold text-muted-foreground italic">ml</span>
					</div>
				</div>
				<div class="grid grid-cols-3 gap-2">
					{#each [250, 500, 750] as amt}
						<Button
							type="button"
							variant="outline"
							class="font-semibold"
							onclick={() => {
								const input = document.getElementById('amount') as HTMLInputElement;
								if (input) input.value = amt.toString();
							}}>{amt}ml</Button
						>
					{/each}
				</div>
				<Button type="submit" disabled={loading} class="w-full shadow-sm">
					{#if loading}<Loader2 class="w-4 h-4 mr-2 animate-spin" />ing...{:else}Log Water{/if}
				</Button>
			</form>
		{:else if type === 'Meal'}
			<form
				method="POST"
				action="?/logMeal"
				use:enhance={() => {
					loading = true;
					return ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							toast.success('Meal logged!');
							open = false;
							onSuccess?.();
						}
					};
				}}
				class="space-y-6 py-4"
			>
				<div class="space-y-2">
					<Label for="name" class="font-semibold ml-1">Meal Name</Label>
					<Input
						id="name"
						name="name"
						placeholder="e.g. Grilled Chicken Salad"
						required
						class="h-12 rounded-xl bg-background border-border/40 font-semibold"
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="calories" class="font-semibold ml-1">Calories (est.)</Label>
						<Input
							id="calories"
							name="calories"
							type="number"
							placeholder="450"
							class="h-12 rounded-xl bg-background border-border/40 font-semibold"
						/>
					</div>
					<div class="space-y-2">
						<Label for="type" class="font-semibold ml-1">Type</Label>
						<select
							id="type"
							name="type"
							class="w-full h-12 bg-background border border-border/40 font-semibold px-3 rounded-xl"
						>
							<option>Breakfast</option>
							<option>Lunch</option>
							<option>Dinner</option>
							<option>Snack</option>
						</select>
					</div>
				</div>
				<div class="grid grid-cols-3 gap-3">
					<div class="space-y-2">
						<Label
							for="protein"
							class="text-sm font-bold capitalize tracking-widest text-muted-foreground ml-1"
							>Protein (g)</Label
						>
						<Input
							id="protein"
							name="protein"
							type="number"
							placeholder="20"
							class="h-10 rounded-xl bg-background border-border/40 font-semibold"
						/>
					</div>
					<div class="space-y-2">
						<Label
							for="carbs"
							class="text-sm font-bold capitalize tracking-widest text-muted-foreground ml-1"
							>Carbs (g)</Label
						>
						<Input
							id="carbs"
							name="carbs"
							type="number"
							placeholder="50"
							class="h-10 bg-background border-border/40 font-semibold"
						/>
					</div>
					<div class="space-y-2">
						<Label
							for="fats"
							class="text-sm font-bold capitalize tracking-widest text-muted-foreground ml-1"
							>Fats (g)</Label
						>
						<Input
							id="fats"
							name="fats"
							type="number"
							placeholder="15"
							class="h-10 bg-background border-border/40 font-semibold"
						/>
					</div>
				</div>
				<Button type="submit" disabled={loading} class="w-full shadow-sm">
					{#if loading}<Loader2 class="w-4 h-4 mr-2 animate-spin" />ing...{:else}Log Meal{/if}
				</Button>
			</form>
		{:else if type === 'Workout'}
			<form
				method="POST"
				action="?/logWorkout"
				use:enhance={() => {
					loading = true;
					return ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							toast.success('Workout logged!');
							open = false;
							onSuccess?.();
						}
					};
				}}
				class="space-y-6 py-4"
			>
				<div class="space-y-2">
					<Label for="type" class="font-semibold ml-1">Activity Type</Label>
					<Input
						id="type"
						name="type"
						placeholder="e.g. Running, Yoga"
						required
						class="h-12 bg-background border-border/40 font-semibold"
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="duration" class="font-semibold ml-1">Duration (min)</Label>
						<Input
							id="duration"
							name="duration"
							type="number"
							placeholder="30"
							required
							class="h-12 bg-background border-border/40 font-semibold"
						/>
					</div>
					<div class="space-y-2">
						<Label for="calories" class="font-semibold ml-1">Calories Burned</Label>
						<Input
							id="calories"
							name="calories"
							type="number"
							placeholder="200"
							class="h-12 bg-background border-border/40 font-semibold"
						/>
					</div>
				</div>
				<Button type="submit" disabled={loading} class="w-full shadow-sm">
					{#if loading}<Loader2 class="w-4 h-4 mr-2 animate-spin" />ing...{:else}Log Workout{/if}
				</Button>
			</form>
		{:else if type === 'Weight'}
			<form
				method="POST"
				action="?/logWeight"
				use:enhance={() => {
					loading = true;
					return ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							toast.success('Weight updated!');
							open = false;
							onSuccess?.();
						}
					};
				}}
				class="space-y-6 py-4"
			>
				<div class="space-y-2">
					<Label for="weight" class="font-semibold ml-1">Current Weight (kg)</Label>
					<Input
						id="weight"
						name="weight"
						type="number"
						step="0.1"
						placeholder="75.0"
						required
						class="h-12 rounded-xl bg-background border-border/40 font-semibold"
					/>
				</div>
				<Button type="submit" disabled={loading} class="w-full shadow-sm">
					{#if loading}<Loader2 class="w-4 h-4 mr-2 animate-spin" />ing...{:else}Update Weight{/if}
				</Button>
			</form>
		{:else if type === 'Mood'}
			<form
				method="POST"
				action="?/logMood"
				use:enhance={() => {
					loading = true;
					return ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							toast.success('Mood logged!');
							open = false;
							onSuccess?.();
						}
					};
				}}
				class="space-y-6 py-4"
			>
				<div class="space-y-4">
					<Label class="font-semibold ml-1">How do you feel?</Label>
					<div class="grid grid-cols-5 gap-2">
						{#each ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Excellent'] as mood}
							<label class="flex flex-col items-center gap-2 cursor-pointer group">
								<input type="radio" name="mood" value={mood} required class="sr-only peer" />
								<div
									class="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center peer-checked:bg-primary/20 peer-checked:border-primary transition-all"
								>
									{#if mood === 'Very Sad'}😞{:else if mood === 'Sad'}🙁{:else if mood === 'Neutral'}😐{:else if mood === 'Happy'}🙂{:else}🤩{/if}
								</div>
								<span
									class="text-sm capitalize font-bold text-muted-foreground peer-checked:text-primary"
									>{mood.split(' ')[0]}</span
								>
							</label>
						{/each}
					</div>
				</div>
				<div class="space-y-4">
					<Label class="font-semibold ml-1">Energy Level</Label>
					<div class="grid grid-cols-3 gap-2">
						{#each ['Low', 'Normal', 'High'] as energy}
							<label class="cursor-pointer">
								<input type="radio" name="energy" value={energy} required class="sr-only peer" />
								<div
									class="py-2 text-center border border-border/40 peer-checked:bg-primary/20 peer-checked:border-primary font-bold text-xs transition-all"
								>
									{energy}
								</div>
							</label>
						{/each}
					</div>
				</div>
				<Button type="submit" disabled={loading} class="w-full shadow-sm">
					{#if loading}<Loader2 class="w-4 h-4 mr-2 animate-spin" />ing...{:else}Save Entry{/if}
				</Button>
			</form>
		{:else if type === 'Vitals'}
			<form
				method="POST"
				action="?/logVitals"
				use:enhance={() => {
					loading = true;
					return ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							toast.success('Vitals updated successfully!');
							open = false;
							onSuccess?.();
						}
					};
				}}
				class="space-y-6 py-4"
			>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="systolic" class="font-bold ml-1">Systolic</Label>
						<Input
							id="systolic"
							name="systolic"
							placeholder="120"
							required
							class="h-12 bg-background border-border/40 font-bold"
						/>
					</div>
					<div class="space-y-2">
						<Label for="diastolic" class="font-bold ml-1">Diastolic</Label>
						<Input
							id="diastolic"
							name="diastolic"
							placeholder="80"
							required
							class="h-12 bg-background border-border/40 font-bold"
						/>
					</div>
				</div>
				<div class="space-y-2">
					<Label for="heartRate" class="font-bold ml-1">Heart Rate (bpm)</Label>
					<Input
						id="heartRate"
						name="heartRate"
						placeholder="72"
						required
						class="h-12 rounded-xl bg-background border-border/40 font-bold"
					/>
				</div>
				<Button type="submit" disabled={loading} class="w-full shadow-sm">
					{#if loading}<Loader2 class="w-4 h-4 mr-2 animate-spin" />ing...{:else}Save Vitals{/if}
				</Button>
			</form>
		{:else}
			<div class="py-8 text-center space-y-4">
				<div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
					<Save class="w-8 h-8 text-muted-foreground" />
				</div>
				<p class="font-bold text-muted-foreground italic">Coming Soon: Extended {type} Logging</p>
				<Button variant="ghost" onclick={() => (open = false)}>Close</Button>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
