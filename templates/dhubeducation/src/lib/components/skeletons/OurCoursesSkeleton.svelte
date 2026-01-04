<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Card } from '$lib/components/ui/card';
</script>

<section class="bg-paper dark:bg-primary/5">
	<div class="mx-auto flex flex-col items-center gap-4 text-center center">
		<div class="space-y-2">
			<h2 class="mb-4 text-3xl font-bold">Our Courses</h2>
			<p class="mb-8">Pave your path to global education with our study abroad courses!</p>
		</div>
		<div class="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3">
			{#each [1,2,3] as _, i}
			<Card class="flex flex-col items-stretch rounded-lg dark:bg-secondary w-full">
				<Skeleton class="w-full aspect-video rounded-l-lg" />
				<div class="flex flex-col items-start justify-between p-2 w-full">
					<div class="space-y-2 text-start">
						<Skeleton class="h-4 w-3/4" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-4 w-full" />
							<Skeleton class="h-4 w-3/4" />
						</div>
					</div>
					<Skeleton class="h-4 w-[120px] self-end" />
				</div>
			</Card>
			{/each}
		</div>
	</div>
</section>
