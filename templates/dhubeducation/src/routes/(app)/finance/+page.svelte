<script lang="ts">
	import { createWhatsAppUrl, getDescription, getOgImage } from '$lib/fxns';
	import type { iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { metaStore } from '$lib/stores';

	let { data }: { data: PageData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'Finance | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/finance',
		keywords: [
			'finance',
			'study',
			'abroad',
			'education',
			'international',
			'masters',
			'first degree'
		]
	};

	interface iDocument {
		title: string;
		content: string;
	}
	const documents: iDocument[] = [
		{
			title: 'Residence',
			content:
				'You must be a UK national or have settled status (usually residing in the UK for at least three years before the start of the course) or meet specific residency criteria if you are an EU, EEA, or Swiss national.'
		},
		{
			title: 'Course',
			content:
				'You must be enrolled in an eligible course at a recognized UK institution. This includes undergraduate and postgraduate courses, as well as certain part-time and distance learning programs.'
		},
		{
			title: 'Personal eligibility',
			content:
				'You must be aged under 60 at the start of the academic year for which you are applying. There may be specific age restrictions for certain types of funding.'
		},
		{
			title: 'Previous study',
			content:
				"You may be eligible for student finance even if you've studied before or have previous qualifications, but this can affect the amount of funding you receive."
		},
		{
			title: 'Financial circumstances',
			content:
				'Your eligibility for financial support, including tuition fee loans, maintenance loans, and grants, may depend on your household income or other financial factors.'
		},
		{
			title: 'Course intensity',
			content:
				"If you're studying part-time, you may need to study at a certain intensity (usually at least 25% of the full-time equivalent) to be eligible for student finance."
		},
		{
			title: 'Nationality or residency status',
			content:
				"Different rules may apply if you're an EU, EEA, or Swiss national studying in the UK. Since Brexit, there have been changes to the eligibility criteria for EU, EEA, and Swiss nationals, so it's essential to check the latest guidance."
		},
		{
			title: 'Guarantor',
			content:
				"In some cases, international students may be required to provide a guarantor who is a UK resident or citizen with a stable income and good credit history. The guarantor would be responsible for repaying the loan if you're unable to do so."
		},
		{
			title: 'Repayment plan',
			content:
				"You'll need to demonstrate a feasible plan for repaying the loan, including details of your expected income after graduation and how you intend to manage your finances during your studies and beyond."
		},
		{
			title: 'Loan terms and conditions',
			content:
				"It's essential to carefully review the terms and conditions of the loan, including interest rates, repayment terms, and any fees or penalties associated with the loan."
		}
	];

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

<div class="flex flex-col items-center gap-4 p-4 center">
	<p class="mx-auto rounded-lg border-l-4 border-primary p-4">
		At DHub Education, we're dedicated to turning dreams into reality through education. With our
		flexible finance options, everyone has the opportunity to pursue their studies. Whether you
		qualify for student finance or need a loan, we're here to support you every step of the way.
		Don't let financial constraints hold you back from achieving your educational goals. Join us at
		DHub Education and let's make your dreams come to life together
	</p>

	<p class="mt-4">
		To be eligible for student finance in the UK, you typically need to meet the following
		requirements:
	</p>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each documents as { title, content } (title)}
			<Card class="flex flex-col gap-1 rounded-lg p-4">
				<h4 class="font-medium">{title}</h4>
				<p class="text-muted-foreground">{content}</p>
			</Card>
		{/each}
	</div>
	<div class="flex flex-col items-center gap-2">
		<p>To learn more</p>
		<Button
			{href}
			variant="outline"
			class="border-primary text-primary dark:border-inherit dark:bg-transparent dark:text-white"
			>Click here</Button
		>
	</div>
</div>
