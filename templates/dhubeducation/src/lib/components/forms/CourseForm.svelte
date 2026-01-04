<script lang="ts">
	import type { iCourse, iFile, iUser } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, slugify, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteCourseApi } from '$lib/fxns/api';
	import { Textarea } from '../ui/textarea';
	import SpinLoader from '../widgets/SpinLoader.svelte';
	import Tiptap from '../widgets/editor/Tiptap.svelte';
	import { getContext } from 'svelte';
	import { defaultCourse, Role } from '$lib/constants';
	import { submitForm } from '$lib/client/actions';
	import ImageDropZone from '../ui/file-drop-zone/image-drop-zone.svelte';

	interface Props {
		course: iCourse;
	}

	const me = getContext('me') as iUser;

	let { course }: Props = $props();

	let loading = $state(false);
	let aiLoading = $state(false);

	const title = course ? 'Edit course' : 'Create course';
	const description = course ? 'Edit a course' : 'Add a new course';
	const action = course ? 'Save changes' : 'Create';

	let placeholder = $state(course ? course : defaultCourse);

	let aiContent = $state(placeholder.content);
	let content = $state(placeholder.content);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		loading = true;

		if (me.role !== Role.ADMIN) {
			toast.error('You are not authorized to perform this action');
		} else {
			await submitForm<iCourse>(evt, {
				resource: 'courses',
				data: { content, file: placeholder.file },
				entity: course
			});
		}
		loading = false;
	};

	const onFile = (file?: iFile) => (placeholder.file = file as iFile);

	const handleAiSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const entries = Object.fromEntries(formData.entries());
		const coursename = entries.coursename as string;

		try {
			aiLoading = true;
			const url = '/api/ai/agents/course';
			const options: RequestInit = {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ coursename })
			};
			const response = await fetch(url, options);
			const result = await response.json();
			console.log({ result });
			placeholder.title = result.qualityMetrics.title;
			placeholder.name = result.qualityMetrics.name;
			placeholder.description = result.qualityMetrics.description;
			placeholder.content = result.qualityMetrics.content;
			placeholder.slug = result.qualityMetrics.slug;
			aiContent = result.copy;
			content = result.copy;
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			aiLoading = false;
		}
	};

	const getcontent = ($content: string) => (content = $content);
</script>

<div class="flex items-center justify-between">
	<Heading class="text-start" {title} {description} />
	{#if course}
		<AlertDialog
			name={`${course.name} course`}
			onconfirm={() => deleteCourseApi(course)}
			disabled={loading}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />

<form onsubmit={handleAiSubmit} class="space-y-2">
	<Textarea
		name="coursename"
		placeholder="Paste course title to generate AI content for course"
		class={removeRingClasses()}
	></Textarea>
	{#if aiLoading}
		<Button size="icon">
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit">Generate</Button>
	{/if}
</form>
<form {onsubmit} class="w-full space-y-4">
	<div class="grid grid-cols-1 gap-4">
		<div>
			<Label for="title">Title</Label>
			<Input
				id="title"
				disabled={loading}
				required
				placeholder="Course title e.g. BSc."
				name="title"
				bind:value={placeholder.title}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="name">Name</Label>
			<Input
				id="name"
				disabled={loading}
				required
				placeholder="Course name"
				name="name"
				bind:value={placeholder.name}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="description">Description</Label>
			<Textarea
				id="description"
				disabled={loading}
				required
				placeholder="Course description"
				name="description"
				bind:value={placeholder.description}
				class={removeRingClasses()}
			></Textarea>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<ImageDropZone endpoint="/api/files" file={placeholder.file as iFile} {onFile} />
			{#key aiContent}
				<Tiptap {content} title="Course content" {getcontent} />
			{/key}
		</div>
	</div>
	{#if loading}
		<Button size="icon">
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit">{action}</Button>
	{/if}
</form>
