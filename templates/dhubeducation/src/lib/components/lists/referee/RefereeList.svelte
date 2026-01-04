<script lang="ts">
	import type { ReferralInterface, RefereeInterface } from '$lib/interface';
	import RefereeListitem from './RefereeListitem.svelte';

	interface Props {
		referees: RefereeInterface[];
		referral?: ReferralInterface
	}

	let { referees, referral }: Props = $props();
</script>

<div class="text-sm">
	<div class="grid grid-cols-1 md:grid-cols-[40px_1fr_1fr_1fr_40px] justify-start items-center gap-4 p-2">
		<div class="flex items-center justify-center size-10">#</div>
		<div>Name</div>
		<div>Country</div>
		<div>Course</div>
		<div>Action</div>
	</div>
	{#each referees as referee, i}
		<RefereeListitem index={i + 1} {referee} {referral} />
	{/each}
</div>
