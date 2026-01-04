<script lang="ts">
	import { Button } from '../ui/button';
	import { CheckCheckIcon } from 'lucide-svelte';
</script>

<section class="bg-white dark:bg-secondary">
	<div class="flex w-full max-w-7xl flex-col items-center justify-center center lg:flex-row">
		<div class="mb-6 lg:mb-0 lg:w-1/3">
			<img
				src="https://dhubedu.vercel.app/images/ceo.webp"
				alt="CEO of DHUB Education"
				class="mx-auto h-40 w-40 rounded-full border-4 shadow-xl"
			/>
		</div>
		<div class="space-y-2 text-left lg:w-2/3">
			<h2 class="mb-4 text-center text-3xl font-semibold md:text-start">About DHUB Education</h2>
			<div class="prose text-foreground dark:prose-invert">
				<p class="mb-4">
					At DHUB Education, we understand that pursuing higher education in a foreign country is
					not just about academics; it's a journey that shapes your future and broadens your
					horizons. We are dedicated to ensuring that every international student not only reaches
					their dream university but also thrives in their new home, whether it's in the UK, Canada,
					Ireland, Malta, Finland, France, or the USA. We are with you every step of the way.
				</p>
				<p class="mb-4">
					Our mission is to make the dream of studying abroad a seamless and enriching reality for
					students worldwide. We believe that education knows no borders, and, as such, we are
					committed to providing comprehensive support to every student throughout their entire
					journey.
				</p>
				<ul class="list-none pl-5">
					<li class="mb-2">
						<span class="font-bold">✓ University Guidance:</span> We don't just help you find any university;
						we assist in finding the right one for you.
					</li>
					<li class="mb-2">
						<span class="font-bold">✓ Beyond Academics:</span> Extensive city guides and cultural support
						to help you thrive.
					</li>
					<li class="mb-2">
						<span class="font-bold">✓ Financial Support:</span> We ensure that finances won't stand in
						the way of your education.
					</li>
					<li class="mb-2">
						<span class="font-bold">✓ Visa Assistance:</span> Helping you with job placements and career
						start in your host country.
					</li>
					<li class="mb-2">
						<span class="font-bold">✓ Comprehensive Arrival & Accommodation:</span> Ensuring you're settled
						and ready for success.
					</li>
					<li class="mb-2">
						<span class="font-bold">✓ Career Support:</span> Extending support beyond graduation with
						career and immigration help.
					</li>
					<li class="mb-2">
						<span class="font-bold">✓ One-Year Subscription:</span> Ongoing resources to ensure your
						continued success abroad.
					</li>
				</ul>
			</div>
			<Button href="/about" class="rounded-full">Learn more about DHUB</Button>
		</div>
	</div>
</section>
