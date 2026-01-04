<script>
	import { SchoolIcon, GraduationCapIcon, BookCheckIcon, GlobeIcon } from 'lucide-svelte';

	const stats = [
		{ icon: SchoolIcon, value: '3,000+', label: 'Applications' },
		{ icon: GraduationCapIcon, value: '2,600+', label: 'Admissions' },
		{ icon: BookCheckIcon, value: '2,200+', label: 'Visas Processed' },
		{ icon: GlobeIcon, value: '10+', label: 'Countries' }
	];
</script>

<section class="bg-gradient-to-r md:py-16">
	<div class="mx-auto text-center center">
		<h2 class="mb-4 text-3xl font-bold">Empowering Global Education</h2>
		<p class="mb-8">
			DHUB Education has successfully helped thousands achieve their academic dreams worldwide.
		</p>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
			{#each stats as { icon, value, label }}
				{@const Icon = icon}
				<div
					class="flex flex-col items-center rounded-lg bg-white/10 p-6 shadow-lg backdrop-blur-md"
				>
					<Icon class="text-4xl text-white" />
					<h3 class="text-3xl font-bold">{value}</h3>
					<p class="font-medium">{label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
