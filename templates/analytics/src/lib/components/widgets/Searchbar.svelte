<script lang="ts">
	import type { iResult } from '@toolsntuts/utils';
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';

	let searchPrompt = $state('');
	let loading = $state(false);

	const isValidLink = (link: string) => {
		const regex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
		return regex.test(link);
	};

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const isValid = isValidLink(searchPrompt);

		if (!isValid) {
			alert('Please enter a valid product link.');
			return;
		}

		try {
			loading = true;
			const options: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ productUrl: searchPrompt }),
			};
			const apiUrl = '/api/scrape';
			const response = await fetch(apiUrl, options);
			const result = await response.json() as iResult
			console.log({ result })
			// Scrape the product page
		} catch (error: any) {
			console.log({ error })
		} finally {
			loading = false;
		}
	};
</script>

<form class="flex flex-wrap gap-4" {onsubmit}>
	<Input
		bind:value={searchPrompt}
		name="searchPrompt"
		placeholder="Enter product link"
		class="shadow-xs w-full min-w-[200px] flex-1 rounded-lg border border-gray-300 p-3 text-base text-gray-500 focus:outline-none"
	/>
	<Button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</Button>
</form>
