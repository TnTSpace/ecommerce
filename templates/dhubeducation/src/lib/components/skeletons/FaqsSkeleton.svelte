<script lang="ts">
	import { Skeleton } from '../ui/skeleton';
</script>

<section>
	<div class="mx-auto flex flex-col items-center gap-4 text-center center">
		<div class="space-y-2">
			<h2 class="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
			<p class="mb-8">Find answers to common questions and make your journey smoother!</p>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each [1, 2, 3, 4, 5, 6] as _, i}
				<div class="flex flex-col gap-2">
					<Skeleton class="h-4 w-full" />
					<div class="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3">
						{#each [1, 2, 3] as _, i}
							<div class="flex flex-col gap-2">
								<Skeleton class="h-4 w-full" />
								<Skeleton class="h-4 w-3/4" />
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
