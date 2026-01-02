<script lang="ts">
	import InfoIcon from 'lucide-svelte/icons/info';
	import AlertCircle from 'lucide-svelte/icons/circle-alert';
	import { Alert, AlertDescription, AlertTitle } from '../alert';
	import { Button } from '../button';

	interface Props {
		title: string;
		message: string;
		href: string;
		linkText: string;
		variant: 'default' | 'destructive';
	}

	let { message, title, href, linkText, variant }: Props = $props();
</script>

<Alert {variant} class="flex flex-col gap-2">
	{#if variant === 'default'}
		<InfoIcon class="size-4" />
	{:else}
		<AlertCircle class="size-4" />
	{/if}
	<AlertTitle>{title}</AlertTitle>
	<AlertDescription class="flex flex-col gap-2">
		{message}
		<Button {href} class="md:w-fit">{linkText}</Button>
	</AlertDescription>
</Alert>
