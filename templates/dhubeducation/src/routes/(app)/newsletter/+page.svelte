<script lang="ts">
	import { createWhatsAppUrl } from '$lib/fxns';
	import Hero from '$lib/components/sections/Hero.svelte';
	import { metaStore } from '$lib/stores';
	import NewsletterForm from '$lib/components/forms/NewsletterForm.svelte';

	$metaStore = {
		...$metaStore,
		title: 'Newsletter | DHUB Education',
	};
	const href = createWhatsAppUrl('Hello');
</script>

<Hero
	options={{
		cta: false,
		title: $metaStore.title,
		subline: [$metaStore.description],
		backgroundImage: $metaStore.ogimage
	}}
/>

<div class="p-4 w-full max-w-md mx-auto">
	<NewsletterForm />
</div>
