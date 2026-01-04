<script lang="ts">
	import type { iDoctor } from '$lib/interface';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Star, Clock, ArrowRight } from '@lucide/svelte';

	interface Props {
		doctor: iDoctor;
		onBook: (doctor: iDoctor) => void;
	}

	let { doctor, onBook }: Props = $props();
</script>

<Card.Root
	class="group relative hover:shadow-2xl transition-all duration-500 border-border/40 hover:border-primary/40 overflow-hidden bg-card/40 backdrop-blur-xl rounded-[2rem]"
>
	<div
		class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
	></div>
	<Card.Content class="p-6 space-y-5">
		<div class="flex items-start justify-between">
			<div class="flex items-center gap-5">
				<Avatar.Root class="w-16 h-16 transition-all shadow-inner">
					<Avatar.Fallback class="bg-primary/10 text-primary font-bold text-xl"
						>{doctor.name
							.split(' ')
							.map((n) => n[0])
							.join('')}</Avatar.Fallback
					>
				</Avatar.Root>
				<div>
					<h3 class="font-bold text-xl text-foreground/90">{doctor.name}</h3>
					<p class="text-sm text-primary font-semibold capitalize tracking-wider">
						{doctor.specialty}
					</p>
				</div>
			</div>
			{#if doctor.available}
				<Badge
					variant="secondary"
					class="bg-emerald-500/15 text-emerald-500 border-none font-bold px-3 py-1 rounded-full text-sm capitalize"
				>
					{doctor.available}
				</Badge>
			{/if}
		</div>

		<div class="flex items-center gap-6 py-4 border-y border-border/30">
			<div class="flex flex-col">
				<div class="flex items-center gap-1.5 font-bold">
					<Star class="w-4 h-4 fill-amber-400 text-amber-400" />
					{doctor.rating || '0.0'}
				</div>
				<span class="text-sm text-muted-foreground font-semibold capitalize tracking-tighter"
					>{doctor.reviews || 0} Reviews</span
				>
			</div>
			<div class="h-8 w-[1px] bg-border/40"></div>
			<div class="flex flex-col">
				<div class="flex items-center gap-1.5 font-bold">
					<Clock class="w-4 h-4 text-primary" />
					30<span class="text-xs font-normal">m</span>
				</div>
				<span class="text-sm text-muted-foreground font-semibold capitalize tracking-tighter"
					>Session</span
				>
			</div>
		</div>

		<div class="flex items-center justify-between pt-2">
			<div class="flex flex-col">
				<span class="text-sm text-muted-foreground font-bold capitalize">Consultation Fee</span>
				<div class="text-2xl font-bold text-primary">
					₦{(doctor.price / 100).toLocaleString()}
				</div>
			</div>
			<Button
				class="rounded-2xl px-6 py-6 bg-primary hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(var(--primary),0.5)] transform group-hover:scale-105 transition-all font-bold"
				onclick={() => onBook(doctor)}
			>
				Book Now
				<ArrowRight class="ml-2 w-5 h-5" />
			</Button>
		</div>
	</Card.Content>
</Card.Root>
