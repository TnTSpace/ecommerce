<script lang="ts">
	import JumiaExpress from '../icons/JumiaExpress.svelte';

	interface Props {
		checked: boolean
	}
	let { checked=$bindable(false) }: Props = $props()
</script>

<div class="form-control">
	<label class="label cursor-pointer justify-start gap-2 px-0 flex items-center">
		<input
			bind:checked
			type="checkbox"
			class="checkbox checkbox-primary h-[20px] w-[20px]"
			value="shop_express"
		/>
		<JumiaExpress class="h-3.5" />
	</label>
</div>
