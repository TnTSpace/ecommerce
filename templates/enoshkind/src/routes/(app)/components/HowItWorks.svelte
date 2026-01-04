<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { FileSearch, MapPin, Send, Activity } from '@lucide/svelte';

	const steps = [
		{
			number: '01',
			icon: FileSearch,
			title: 'Book Your Test',
			description:
				'Browse and select from our comprehensive range of clinical and DNA tests directly in the app.'
		},
		{
			number: '02',
			icon: MapPin,
			title: 'Visit Partner Lab',
			description:
				'Visit any of our certified partner laboratories across Nigeria. No paperwork or file holding required.'
		},
		{
			number: '03',
			icon: Send,
			title: 'Digital Processing',
			description:
				'The app securely transmits your request to the lab, and they process your samples immediately.'
		},
		{
			number: '04',
			icon: Activity,
			title: 'Results in App',
			description:
				'Receive your detailed results and AI-powered interpretation directly on your mobile device.'
		}
	];
</script>

<section class="py-24">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16 max-w-2xl mx-auto">
			<Badge variant="secondary" class="mb-4">How It Works</Badge>
			<h2 class="text-3xl md:text-4xl font-bold mb-4">
				Laboratory Testing <span class="text-primary">Made Easy</span>
			</h2>
			<p class=" text-muted-foreground">
				A seamless process from booking to results, right at your fingertips.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each steps as step, i}
				{@const Icon = step.icon}
				<div class="relative">
					<!-- Connector line -->
					{#if i < steps.length - 1}
						<div
							class="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border"
						></div>
					{/if}

					<div class="text-center">
						<div class="relative inline-flex mb-6">
							<div class="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center">
								<Icon class="w-10 h-10 text-primary" />
							</div>
							<span
								class="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold"
							>
								{step.number}
							</span>
						</div>
						<h3 class=" font-semibold mb-2">{step.title}</h3>
						<p class="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
