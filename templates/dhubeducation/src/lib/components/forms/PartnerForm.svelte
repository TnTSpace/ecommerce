<script lang="ts">
	import type { iFile, iPartner, iUser } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, slugify, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deletePartnerApi } from '$lib/fxns/api';
	import { Textarea } from '$lib/components/ui/textarea';
	import SpinLoader from '../widgets/SpinLoader.svelte';
	import Tiptap from '../widgets/editor/Tiptap.svelte';
	import { getContext } from 'svelte';
	import { defaultPartner, Role } from '$lib/constants';
	import { submitForm } from '$lib/client/actions';
	import ImageDropZone from '../ui/file-drop-zone/image-drop-zone.svelte';

	interface Props {
		partner: iPartner;
	}

	const me = getContext('me') as iUser;

	let { partner }: Props = $props();

	let loading = $state(false);
	let aiLoading = $state(false);

	const title = partner ? 'Edit partner' : 'Create partner';
	const description = partner ? 'Edit a partner' : 'Add a new partner';
	const action = partner ? 'Save changes' : 'Create';

	let placeholder = $state(partner ? partner : defaultPartner);

	let aiContent = $state(placeholder.content);
	let content = $state(placeholder.content);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		loading = true;

		if (me.role !== Role.ADMIN) {
			toast.error('You are not authorized to perform this action');
		} else {
			await submitForm<iPartner>(evt, {
				resource: 'partners',
				data: { content, file: placeholder.file },
				entity: partner
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
		const partnercontent = entries.partnercontent as string;

		try {
			aiLoading = true;
			const url = '/api/ai/agents/partner';
			const options: RequestInit = {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ partnercontent })
			};
			const response = await fetch(url, options);
			const result = await response.json();
			placeholder.name = result.qualityMetrics.name;
			placeholder.content = result.qualityMetrics.content;
			placeholder.country = result.qualityMetrics.country;
			placeholder.website = result.qualityMetrics.website;
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
	{#if partner}
		<AlertDialog
			name={`${partner.name} partner`}
			onconfirm={() => deletePartnerApi(partner)}
			disabled={loading}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />

<form onsubmit={handleAiSubmit} class="space-y-2">
	<Textarea
		name="partnercontent"
		placeholder="Paste partner name to generate AI content for partner"
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
				placeholder="Partner name"
				name="name"
				bind:value={placeholder.name}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="website">Website</Label>
			<Input
				id="website"
				disabled={loading}
				required
				placeholder="Partner website"
				name="website"
				bind:value={placeholder.website}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="country">Country</Label>
			<Input
				id="country"
				disabled={loading}
				required
				placeholder="Partner country"
				name="country"
				bind:value={placeholder.country}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="type">Type</Label>
			<Input
				id="type"
				disabled={loading}
				required
				placeholder="Partner type (e.g. University)"
				name="type"
				bind:value={placeholder.type}
				class={removeRingClasses()}
			/>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<ImageDropZone endpoint="/api/files" file={placeholder.file as iFile} {onFile} />
			{#key aiContent}
				<Tiptap {content} title="Partner content" {getcontent} />
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
