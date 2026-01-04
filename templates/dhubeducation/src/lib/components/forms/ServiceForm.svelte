<script lang="ts">
	import type { iFile, iService, iUser } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, slugify, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteServiceApi } from '$lib/fxns/api';
	import { Textarea } from '../ui/textarea';
	import SpinLoader from '../widgets/SpinLoader.svelte';
	import Tiptap from '../widgets/editor/Tiptap.svelte';
	import { getContext } from 'svelte';
	import { defaultService, Role } from '$lib/constants';
	import { submitForm } from '$lib/client/actions';
	import ImageDropZone from '../ui/file-drop-zone/image-drop-zone.svelte';

	interface Props {
		service: iService;
	}

	const me = getContext('me') as iUser;

	let { service }: Props = $props();

	let loading = $state(false);
	let aiLoading = $state(false);

	const title = service ? 'Edit service' : 'Create service';
	const description = service ? 'Edit a service' : 'Add a new service';
	const action = service ? 'Save changes' : 'Create';

	let placeholder = $state(service ? service : defaultService);

	let aiContent = $state(placeholder.content);
	let content = $state(placeholder.content);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		loading = true;

		if (me.role !== Role.ADMIN) {
			toast.error('You are not authorized to perform this action');
		} else {
			await submitForm<iService>(evt, {
				resource: 'services',
				data: { content, file: placeholder.file },
				entity: service
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
		const servicename = entries.servicename as string;

		try {
			aiLoading = true;
			const url = '/api/ai/agents/service';
			const options: RequestInit = {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ servicename })
			};
			const response = await fetch(url, options);
			const result = await response.json();
			console.log({ result });
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
	{#if service}
		<AlertDialog
			name={`${service.name} service`}
			onconfirm={() => deleteServiceApi(service)}
			disabled={loading}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />

<form onsubmit={handleAiSubmit} class="space-y-2">
	<Textarea
		name="servicename"
		placeholder="Paste service name to generate AI content for service"
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
			<Label for="name">Name</Label>
			<Input
				id="name"
				disabled={loading}
				required
				placeholder="Service name"
				name="name"
				bind:value={placeholder.name}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="description">Description</Label>
			<Input
				id="description"
				disabled={loading}
				required
				placeholder="Service description"
				name="description"
				bind:value={placeholder.description}
				class={removeRingClasses()}
			/>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<ImageDropZone endpoint="/api/files" file={placeholder.file as iFile} {onFile} />
			{#key aiContent}
				<Tiptap {content} title="Service content" {getcontent} />
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
