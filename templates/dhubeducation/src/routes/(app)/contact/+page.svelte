<script lang="ts">
	import { createWhatsAppUrl, getDescription, getOgImage } from '$lib/fxns';
	import type { iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import WhatsAppBtn from '$lib/components/widgets/WhatsAppBtn.svelte';
	import { metaStore } from '$lib/stores';

	let { data }: { data: PageData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'Contact Us | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/finance',
		keywords: [
			'contact',
			'study',
			'abroad',
			'education',
			'international',
			'masters',
			'first degree'
		]
	};
	const href = createWhatsAppUrl('Hello');
</script>

<Hero
	options={{
		cta: false,
		title: slider.title,
		subline: [slider.subline],
		backgroundImage: slider.background
	}}
/>

<div class="flex flex-col items-center gap-2">
	<p>For inquiries contact us via WhatsApp by clicking the button below</p>
	<Button
		{href}
		variant="outline"
		size="icon"
		class="border-primary text-primary dark:border-inherit dark:bg-transparent dark:text-white"
	>
		<WhatsAppBtn />
	</Button>
</div>
