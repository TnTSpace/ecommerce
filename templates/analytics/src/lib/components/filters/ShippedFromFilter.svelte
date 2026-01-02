<script lang="ts">
	import JumiaGlobal from '../icons/JumiaGlobal.svelte';

	interface Props {
		shippedFrom: string;
	}

	let { shippedFrom = $bindable('') }: Props = $props();

	export const restore = () => {
		shippedFrom = '';
	};
</script>

<div class="form-control">
	<label class="label cursor-pointer justify-start gap-2 px-0">
		<input
			bind:group={shippedFrom}
			name="shippedFrom"
			type="radio"
			value="global"
			class="radio radio-primary h-[20px] w-[20px]"
		/>
		<JumiaGlobal class="px-2 py-0" name="Shipped from abroad" />
	</label>
</div>

<div class="form-control">
	<label class="label cursor-pointer justify-start gap-2 px-0">
		<input
			bind:group={shippedFrom}
			name="shippedFrom"
			type="radio"
			value="local"
			class="radio radio-primary h-[20px] w-[20px]"
		/>

		<span class="capitalize">ship locally</span>
	</label>
</div>

<div class="form-control">
	<label class="label cursor-pointer justify-start gap-2 px-0">
		<input
			bind:group={shippedFrom}
			name="shippedFrom"
			type="radio"
			value=""
			class="radio radio-primary h-[20px] w-[20px]"
		/>

		<span class="capitalize">all products</span>
	</label>
</div>
