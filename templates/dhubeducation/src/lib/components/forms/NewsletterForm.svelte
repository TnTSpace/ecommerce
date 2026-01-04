<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "../ui/button";
	import SpinLoader from "../widgets/SpinLoader.svelte";
	import { Mail } from "lucide-svelte";
	import type { iResult } from "@toolsntuts/utils";
	import { Input } from "../ui/input";

	let loading = $state(false);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;
			const options: RequestInit = {
				method: 'POST',
				body: formData
			};
			const response = await fetch('/api/newsletter', options);
			const { status, message } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				toast.success(message);
				location.reload();
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<form class="space-y-5" {onsubmit}>
	<div class="space-y-2">
		<div class="relative">
			<Input
				id="dialog.-subscribe"
				name="email"
				required
				class="peer ps-9"
				placeholder="hi@youremail.com"
				type="email"
				aria-label="Email"
			/>
			<div
				class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
			>
				<Mail size={16} strokeWidth={2} aria-hidden="true" />
			</div>
		</div>
	</div>
	{#if loading}
		<Button class="w-full">
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit" class="w-full">Subscribe</Button>
	{/if}
</form>
