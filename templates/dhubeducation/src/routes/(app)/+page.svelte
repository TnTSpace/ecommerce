<script lang="ts">
	import Hero from '$lib/components/homepage/Hero.svelte';
	import Callout from '$lib/components/homepage/Callout.svelte';
	import CeoMessage from '$lib/components/homepage/CEOMessage.svelte';
	import ReviewSection from '$lib/components/homepage/ReviewSection.svelte';
	import type { PageServerData } from './$types';
	import type { iBlog, iCampaign, iCourse, iFaq, iPartner, iService } from '$lib/interface';
	import { page } from '$app/state';
	import FaqsSkeleton from '$lib/components/skeletons/FaqsSkeleton.svelte';
	import OurFaqs from '$lib/components/homepage/OurFaqs.svelte';
	import OurCourses from '$lib/components/homepage/OurCourses.svelte';
	import OurBlogs from '$lib/components/homepage/OurBlogs.svelte';
	import OurServices from '$lib/components/homepage/OurServices.svelte';
	import OurPartners from '$lib/components/homepage/OurPartners.svelte';
	import CardSkeleton from '$lib/components/skeletons/CardSkeleton.svelte';
	import { Button } from '$lib/components/ui/button';
	import AlertWidget from '$lib/components/widgets/AlertWidget.svelte';
	import BannerSkeleton from '$lib/components/skeletons/BannerSkeleton.svelte';
	import { Constants } from '$lib/constants';
	import { onMount } from 'svelte';
	import type { iPresentation } from '$lib/components/ui/reveal/types';
	import RevealDeck from '$lib/components/ui/reveal/reveal-deck.svelte';
	import Wrap from '$lib/components/widgets/Wrap.svelte';
	import RecruitmentHero from '$lib/components/sections/RecruitmentHero.svelte';
	import Campaigns from '$lib/components/lists/Campaigns.svelte';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	onMount(() => {
		const redirect = localStorage.getItem(Constants.REDIRECT);

		if (redirect && redirect.length) {
			location.href = redirect;
		}
	});
	const presentations: iPresentation[] = [
		{
			id: '1',
			active: true,
			date: '2025-07-20T12:24:23.913',
			order: 1,
			name: 'Dhub Education',
			subline: 'Your child can study Medicine for just £9,000',
			image:
				'https://ik.imagekit.io/7wgh8xbqy/study-medicine-for-9k_1024_7j4nZEgbo.webp?w=480;1024;1920&format=webp&as=srcset',
			type: 'Generic',
			href: 'https://www.dhubeducation.com/blogs/rec_d1h5fkk2uju7ir7d5l40',
			cta: 'Discover',
			videourl: ''
		},
		{
			id: '2',
			active: true,
			date: '2023-12-28T12:25:52.184',
			order: 2,
			name: 'Our Blogs',
			subline: 'Navigate the path to educational excellence through our blog posts',
			image: 'https://www.dhubeducation.com/uploads/slides/homepage/blog_1600x900.webp',
			type: 'Generic',
			href: '/blogs',
			cta: 'Learn more',
			videourl: ''
		}
	];
</script>

<div class="space-y-4 py-4">
	<Callout />

	<Wrap>
		<RevealDeck {presentations} />
	</Wrap>
	{#await data.getCampaigns}
		<BannerSkeleton />
	{:then result}
		{@const campaigns = result.data as iCampaign[]}
		<Hero {campaigns} />
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading campaign"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}
	<CeoMessage />
	<RecruitmentHero />

	{#await data.getCampaigns}
		<section class="bg-paper dark:bg-primary/5">
			<div class="mx-auto flex flex-col items-center gap-4 text-center center">
				<div class="space-y-2">
					<h2 class="mb-4 text-3xl font-bold">Our Campaigns</h2>
					<p class="mb-8">Discover our yearly events and stay tuned to updates from Dhub</p>
				</div>
				<CardSkeleton />
				<Button href="/campaigns" class="w-full md:w-fit">All Campaigns</Button>
			</div>
		</section>
	{:then result}
		{@const campaigns = result.data as iCampaign[]}
		<section class="bg-paper dark:bg-primary/5">
			<div class="mx-auto flex flex-col items-center gap-4 text-center center">
				<div class="space-y-2">
					<h2 class="mb-4 text-3xl font-bold">Our Campaigns</h2>
					<p class="mb-8">Discover our yearly events and stay tuned to updates from Dhub</p>
				</div>
				<Campaigns campaigns={campaigns.slice(0, 3)} class="center" />
				<Button href="/campaigns" class="w-full md:w-fit">All Campaigns</Button>
			</div>
		</section>
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading campaigns"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}

	<div class="flex flex-col items-center gap-4">
		<ReviewSection length={3} />
		<Button href="/reviews" class="mx-auto w-[calc(100%-32px)] md:w-fit">All Reviews</Button>
	</div>
	{#await data.getPartners}
		<section class="bg-paper dark:bg-primary/5">
			<div class="mx-auto flex flex-col items-center gap-4 text-center center">
				<div class="space-y-2">
					<h2 class="mb-4 text-3xl font-bold">Our Partners</h2>
					<p class="mb-8">Discover the valued collaborations that drive our mission forward!</p>
				</div>
				<CardSkeleton />
				<Button href="/partners" class="w-full md:w-fit">All Partners</Button>
			</div>
		</section>
	{:then result}
		{@const partners = result.data as iPartner[]}
		<OurPartners partners={partners.slice(0, 3)} />
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading partners"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}

	{#await data.getServices}
		<section class="center">
			<div class="mx-auto flex flex-col items-center gap-4 text-center center">
				<div class="space-y-2">
					<h2 class="mb-4 text-3xl font-bold">Our Services</h2>
					<p class="mb-8">Explore our tailored solutions for your educational journey!</p>
				</div>
				<CardSkeleton />
				<Button href="/services" class="w-full md:w-fit">All Services</Button>
			</div>
		</section>
	{:then result}
		{@const services = result.data as iService[]}
		<OurServices services={services.slice(0, 3)} />
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading services"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}

	{#await data.getCourses}
		<section class="bg-paper dark:bg-primary/5">
			<div class="mx-auto flex flex-col items-center gap-4 text-center center">
				<div class="space-y-2">
					<h2 class="mb-4 text-3xl font-bold">Our Courses</h2>
					<p class="mb-8">Pave your path to global education with our study abroad courses!</p>
				</div>
				<CardSkeleton />
				<Button href="/courses" class="w-full md:w-fit">All Courses</Button>
			</div>
		</section>
	{:then result}
		{@const courses = result.data as iCourse[]}
		<OurCourses courses={courses.slice(0, 3)} />
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading courses"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}

	{#await data.getFaqs}
		<FaqsSkeleton />
	{:then result}
		{@const faqs = result.data as iFaq[]}
		<OurFaqs {faqs} />
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading faqs"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}

	{#await data.getBlogs}
		<section class="bg-paper dark:bg-primary/5">
			<div class="mx-auto flex flex-col items-center gap-4 text-center center">
				<div class="space-y-2">
					<h2 class="mb-4 text-3xl font-bold">Our Blogs</h2>
					<p class="mb-8">Stay informed with our recent posts!</p>
				</div>
				<CardSkeleton />
				<Button href="/blogs" class="w-full md:w-fit">All Blogs</Button>
			</div>
		</section>
	{:then result}
		{@const blogs = result.data as iBlog[]}
		<OurBlogs blogs={blogs.slice(0, 3)} />
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading blogs"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}
</div>
