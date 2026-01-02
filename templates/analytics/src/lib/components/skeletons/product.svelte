<script lang="ts">
</script>
<div
	aria-label="skeleton"
	class=" w-full overflow-hidden rounded shadow-jumia bg-white dark:bg-dmpaperx2 text-sm flex flex-col relative pb-[48px]">
	<div class="w-full relative flex aspect-square">
		<img src="/680x680_dark.png" class="w-full hidden dark:flex" alt="skeleton product " />
		<img src="/680x680_light.png" class="w-full flex dark:hidden" alt="skeleton product " />
	</div>
	<div aria-label="details" class="p-2 flex flex-col gap-2">
		<div class="flex flex-col gap-1 items-start justify-between">
			<small
				class="bg-jumia-light-bg dark:bg-dmpaper w-[40%] text-2xs px-1 rounded font-medium h-[18px] flex items-center justify-center"
			/>
			<small
				class="bg-jumia-light-bg dark:bg-dmpaper w-[50%] text-2xs px-1 rounded font-medium h-[18px] flex items-center justify-center"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<div class="name two-lines h-[18px] w-full bg-jumia-light-bg dark:bg-dmpaper" />
			<div class="name two-lines h-[18px] w-3/4 bg-jumia-light-bg dark:bg-dmpaper" />
		</div>
		<div aria-label="prices" class="leading-[1] flex items-baseline justify-start gap-2 w-full">
			<div class="font-medium w-1/4 h-[18px] bg-jumia-light-bg dark:bg-dmpaper" />
			<div
				class="line-through text-font-fade text-xs w-1/5 h-[18px] bg-jumia-light-bg dark:bg-dmpaper"
			/>
		</div>
		<div class="font-medium w-[50%] h-[18px] bg-jumia-light-bg dark:bg-dmpaper" />
		<div class="font-medium w-[60%] h-[18px] bg-jumia-light-bg dark:bg-dmpaper" />
		<div
			aria-label="cta"
			class="flex items-center gap-2 justify-between w-[calc(100%-16px)] absolute bottom-2 left-1/2 -translate-x-1/2">
			<div aria-label="badges" class="flex items-center gap-2 h-[32px] bg-jumia-light-bg dark:bg-dmpaper w-[40%]">
			</div>
			<div class="rounded-full w-[48px] h-[32px] bg-jumia-light-bg dark:bg-dmpaper"></div>
			<div class="flex items-center gap-1">
				<div class="rounded w-[32px] h-[32px] bg-jumia-light-bg dark:bg-dmpaper"></div>
				<div class="rounded w-[32px] h-[32px] bg-jumia-light-bg dark:bg-dmpaper"></div>
			</div>
		</div>
	</div>
</div>