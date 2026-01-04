<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import type { iCourse, iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	import Courses from '$lib/components/lists/Courses.svelte';
	import CourseRegistrationForm from '$lib/components/forms/CourseRegistrationForm.svelte';
	import CardSkeleton from '$lib/components/skeletons/CardSkeleton.svelte';
	import AlertWidget from '$lib/components/widgets/AlertWidget.svelte';
	import { metaStore } from '$lib/stores';

	let { data }: { data: PageServerData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'Courses | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/courses',
		keywords: [
			'courses',
			'study',
			'abroad',
			'education',
			'international',
			'masters',
			'first degree'
		]
	};
</script>

<Hero
	options={{
		cta: false,
		title: slider.title,
		subline: [slider.subline],
		backgroundImage: slider.background
	}}
/>

<div class="flex flex-col gap-4">
	<p class="w-fit px-4 py-2 text-muted-foreground">🚨courses are for students in the UK</p>
	{#await data.getCourses}
		<CardSkeleton class="center" />
	{:then result}
		{@const courses = result.data as iCourse[]}
		<Courses {courses} class="center" />
		<div class="center">
			<CourseRegistrationForm {courses} form={data.form} />
		</div>
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading courses"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}
</div>
