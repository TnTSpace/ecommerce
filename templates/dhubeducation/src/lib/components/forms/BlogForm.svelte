<script lang="ts">
	import type { iBlog, iFile, iUser } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteBlogApi } from '$lib/fxns/api'; 
	import { Textarea } from '../ui/textarea';
	import SpinLoader from '../widgets/SpinLoader.svelte';
	import Tiptap from '../widgets/editor/Tiptap.svelte';
	import { getContext } from 'svelte';
	import { defaultBlog, Role } from '$lib/constants';
	import { submitForm } from '$lib/client/actions';
	import ImageDropZone from '../ui/file-drop-zone/image-drop-zone.svelte';

	interface Props {
		blog: iBlog;
	}

	const me = getContext('me') as iUser;

	let { blog }: Props = $props();

	let loading = $state(false);
	let aiLoading = $state(false);

	const title = blog ? 'Edit blog' : 'Create blog';
	const description = blog ? 'Edit a blog' : 'Add a new blog';
	const action = blog ? 'Save changes' : 'Create';

	let placeholder = $state(blog ? blog : defaultBlog);

	let aiContent = $state(placeholder.content);
	let content = $state(placeholder.content);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		loading = true;

		if (me.role !== Role.ADMIN) {
			toast.error('You are not authorized to perform this action');
		} else {
			await submitForm<iBlog>(evt, {
				resource: 'blogs',
				data: { content, file: placeholder.file },
				entity: blog
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
		const blogcontent = entries.blogcontent as string;

		try {
			aiLoading = true;
			const url = '/api/ai/agents/blog';
			const options: RequestInit = {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ blogcontent })
			};
			const response = await fetch(url, options);
			const result = await response.json();
			console.log({ result });
			placeholder.title = result.qualityMetrics.title;
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
	{#if blog}
		<AlertDialog
			name={`${blog.title} blog`}
			onconfirm={() => deleteBlogApi(blog)}
			disabled={loading}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />

<form onsubmit={handleAiSubmit} class="space-y-2">
	<Textarea
		name="blogcontent"
		placeholder="Paste blog name to generate AI content for blog"
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
				placeholder="Blog title"
				name="title"
				bind:value={placeholder.title}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="description">Description</Label>
			<Input
				id="description"
				disabled={loading}
				required
				placeholder="Blog description"
				name="description"
				bind:value={placeholder.description}
				class={removeRingClasses()}
			/>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<ImageDropZone endpoint="/api/files" file={placeholder.file as iFile} {onFile} />
			{#key aiContent}
				<Tiptap {content} title="Blog content" {getcontent} />
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
