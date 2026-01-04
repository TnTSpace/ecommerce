<script lang="ts">
	import type { iFaq } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteFaqApi } from '$lib/fxns/api';
	import Select from '../widgets/Select.svelte';
	import Tiptap from '../widgets/editor/Tiptap.svelte';
	import SpinLoader from '../widgets/SpinLoader.svelte';
	import { categoryOrder } from '$lib/constants';

	interface Props {
		faq: iFaq;
	}

	let { faq }: Props = $props();

	let loading = $state(false);

	const title = faq ? 'Edit faq' : 'Create faq';
	const description = faq ? 'Edit a faq' : 'Add a new faq';
	const toastMessage = faq ? 'Faq updated' : 'Faq created';
	const action = faq ? 'Save changes' : 'Create';

	let faqPlaceholder = $state(
		faq
			? faq
			: {
					category: '',
					question: '',
					answer: ''
				}
	);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;

			let response: Response;

			const partialFaq: Partial<iFaq> = {
				category: faqPlaceholder.category,
				question: faqPlaceholder.question,
				answer: faqPlaceholder.answer
			};

			if (faq) {
				const options: RequestInit = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialFaq)
				};
				const url = `/api/faqs/${faq.xata_id}`;

				response = await fetch(url, options);
			} else {
				const options: RequestInit = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialFaq)
				};
				const url = `/api/faqs`;
				response = await fetch(url, options);
			}

			const { message, status, data } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				// location.href = `/admin/faqs`;
				location.reload();
				toast.success(toastMessage);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	// let catList = [
	// 	'General Questions','University Selection and Application', 'Visa and Immigration', 'Finances and Scholarships', 'Pre-Departure and Support', 'Other Questions'
	// ]

	let catList = [...categoryOrder.keys()]
	let categories = catList.map(cat => ({ label: cat, value: cat }))

	const onselected = (value: any) => {
		faqPlaceholder.category = value
	}
	const getcontent = ($content: string) => (faqPlaceholder.answer = $content);
</script>

<div class="flex items-center justify-between">
	<Heading class="text-start" {title} {description} />
	{#if faq}
		<AlertDialog name={faq.question} onconfirm={() => deleteFaqApi(faq)} disabled={loading}>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />

<form {onsubmit} class="w-full space-y-4">
	<div class="grid grid-cols-1 gap-4">
		<div>
			<Label for="category">Category</Label>
			<Select initialValue={faqPlaceholder.category} {onselected} options={categories} name="category" />
		</div>
		<div>
			<Label for="question">Question</Label>
			<Input
				id="question"
				disabled={loading}
				required
				placeholder="Faq question"
				name="question"
				bind:value={faqPlaceholder.question}
				class={removeRingClasses()}
			/>
		</div>
		<Tiptap content={faqPlaceholder.answer} title="Faq answer" {getcontent} />
	</div>
	{#if loading}
		<Button size="icon">
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit">{action}</Button>
	{/if}
</form>
