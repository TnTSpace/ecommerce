<script lang="ts">
	import type { iFaq } from '$lib/interface';
	import Faqs from '../lists/Faqs.svelte';

	interface Props {
		faqs: iFaq[];
	}

	let { faqs }: Props = $props();
</script>

<div class="mx-auto flex flex-col items-center gap-4 text-center center">
	<div class="space-y-2">
		<h2 class="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
		<p class="mb-8">
			Find answers to common questions and make your journey smoother!
		</p>
	</div>
	<Faqs {faqs} />
</div>
