<script lang="ts">
	import type { iCampaign, iFile, iUser } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteCampaignApi } from '$lib/fxns/api';
	import { Textarea } from '../ui/textarea';
	import SpinLoader from '../widgets/SpinLoader.svelte';
	import Tiptap from '../widgets/editor/Tiptap.svelte';
	import { getContext } from 'svelte';
	import { defaultCampaign, Role } from '$lib/constants';
	import { submitForm } from '$lib/client/actions';
	import ImageDropZone from '../ui/file-drop-zone/image-drop-zone.svelte';
	import { toDatetimeLocal } from '$lib/fxns';

	interface Props {
		campaign?: iCampaign;
	}

	const me = getContext('me') as iUser;

	let { campaign }: Props = $props();

	let loading = $state(false);
	let aiLoading = $state(false);

	const title = campaign ? 'Edit campaign' : 'Create campaign';
	const description = campaign ? 'Edit a campaign' : 'Add a new campaign';
	const action = campaign ? 'Save changes' : 'Create';

	let placeholder = $state(campaign ? campaign : defaultCampaign);

	let aiContent = $state(placeholder.content);
	let content = $state(placeholder.content);

	let startDate = $state(campaign?.startDate ? toDatetimeLocal(campaign?.startDate) : '');
	let endDate = $state(campaign?.endDate ? toDatetimeLocal(campaign?.endDate) : '');

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		loading = true;

		if (me.role !== Role.ADMIN) {
			toast.error('You are not authorized to perform this action');
		} else {
			await submitForm<iCampaign>(evt, {
				resource: 'campaigns',
				data: { content, file: placeholder.file },
				entity: campaign
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
		const campaigncontent = entries.campaigncontent as string;

		try {
			aiLoading = true;
			const url = '/api/ai/agents/campaign';
			const options: RequestInit = {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ campaigncontent })
			};
			const response = await fetch(url, options);
			const result = await response.json();
			console.log({ result });
			placeholder.title = result.qualityMetrics.title;
			placeholder.description = result.qualityMetrics.description;
			placeholder.content = result.qualityMetrics.content;
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
	{#if campaign}
		<AlertDialog
			name={`${campaign.title} campaign`}
			onconfirm={() => deleteCampaignApi(campaign)}
			disabled={loading}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />

<form onsubmit={handleAiSubmit} class="space-y-2">
	<Textarea
		name="campaigncontent"
		placeholder="Paste campaign name to generate AI content for campaign"
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
				placeholder="Campaign title"
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
				placeholder="Campaign description"
				name="description"
				bind:value={placeholder.description}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="startDate">Start Date</Label>
			<Input
				id="startDate"
				disabled={loading}
				required
				placeholder="Campaign start date"
				name="startDate"
				type="datetime-local"
				bind:value={startDate}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="endDate">End Date</Label>
			<Input
				id="endDate"
				disabled={loading}
				required
				placeholder="Campaign end date"
				name="endDate"
				type="datetime-local"
				bind:value={endDate}
				class={removeRingClasses()}
			/>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<ImageDropZone endpoint="/api/files" file={placeholder.file as iFile} {onFile} />
			{#key aiContent}
				<Tiptap {content} title="Campaign content" {getcontent} />
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
