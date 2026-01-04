<script lang="ts">
	import Email from '$lib/components/icons/Email.svelte';
	import Map from '$lib/components/icons/Map.svelte';
	import Phone from '$lib/components/icons/Phone.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="block h-10 bg-primary">
	<div class="flex h-full items-center justify-between !py-0 center">
		<Button
			variant="ghost"
			aria-label="Dhub Map Location"
			href="https://www.google.com/maps/place/5+Union+St,+Ardwick,+Greater+M12+4JD/@53.4728546,-2.2234096,17z/data=!3m1!4b1!4m6!3m5!1s0x487bb1983e4228d5:0x1fa06f2556e8f6ab!8m2!3d53.4728546!4d-2.2208347!16s%2Fg%2F11jzpm82kf?entry=ttu&g_ep=EgoyMDI0MDgyNi4wIKXMDSoASAFQAw%3D%3D"
			class="h-auto text-white hover:bg-transparent hover:text-white"
		>
			<Map class="" />
			<span class="hidden lg:inline-block"
				>5 Union Street, City View House, Manchester M12 4JD UK</span
			>
		</Button>

		<div class="flex items-center gap-2">
			<Button
				href="tel:+447930739927"
				aria-label="Dhub Telephone Number"
				class="h-auto text-white hover:bg-transparent hover:text-white "
				variant="ghost"
			>
				<Phone class="" />
				<span class="hidden lg:inline-block">+44 793 073 9927</span>
			</Button>
			<Button
				variant="ghost"
				aria-label="Dhub Email"
				href="mailto:dhubeducation@gmail.com?subject=DHUB%20Education%20Inquiry&body=Hello"
				class="h-auto text-white hover:bg-transparent hover:text-white "
			>
				<Email class="" />
				<span class="hidden lg:inline-block">dhubeducation@gmail.com</span>
			</Button>
		</div>
	</div>
</div>
