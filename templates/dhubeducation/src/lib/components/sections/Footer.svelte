<script lang="ts">
	import { page } from '$app/state';
	import { footerExclusionList, isExcludedFromFooter } from '$lib/constants';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import Brand from './Brand.svelte';
	import Wrap from '../widgets/Wrap.svelte';
	import NewsletterForm from '../forms/NewsletterForm.svelte';

	const pathname = page.url.pathname;

	const excluded = isExcludedFromFooter(pathname);
</script>

<Wrap class={cn('border-t bg-white px-4 pb-14 dark:bg-secondary md:pb-0', excluded && 'md:hidden')}>
	<footer>
		<div class="pb-6 pt-16 lg:pt-24">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div class="flex flex-col gap-6">
					<div class="flex justify-center sm:justify-start">
						<Brand />
					</div>

					<p class="max-w-md text-center text-sm leading-relaxed sm:max-w-xs sm:text-left">
						Empowering international education journeys!
					</p>

					<ul class="flex justify-center gap-4 sm:justify-start">
						<li>
							<a href="https://www.facebook.com/mydhubeducation/" rel="noreferrer" target="_blank">
								<span class="sr-only">Facebook</span>
								<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clip-rule="evenodd"
									/>
								</svg>
							</a>
						</li>

						<li>
							<a
								href="https://www.instagram.com/mydhubeducation/"
								rel="noreferrer"
								target="_blank"
								class=" hover:/75 transition"
							>
								<span class="sr-only">Instagram</span>
								<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
										clip-rule="evenodd"
									/>
								</svg>
							</a>
						</li>

						<li class="flex size-6 items-center justify-center">
							<a href="https://twitter.com/DhubEducation" rel="noreferrer" target="_blank">
								<span class="sr-only">Twitter</span>
								<svg class="size-4" viewBox="0 0 1300 1300" fill="currentColor">
									<g transform="matrix(1,0,0,1,-410.66,-410.658)">
										<path
											d="M1346.34,1589.31L1030.32,1130.16L985.316,1064.8L618.611,532.007L776.351,532.007L1072.91,962.886L1117.91,1028.25L1504.08,1589.31L1346.34,1589.31ZM1569.29,1544.46L1171.26,966.196L1126.26,900.797L841.533,487.149L817.935,452.867L468.066,452.867L553.393,576.864L931.968,1126.92L976.97,1192.25L1281.15,1634.21L1304.75,1668.45L1654.62,1668.45L1569.29,1544.46Z"
											style="fill-rule:nonzero;"
										></path>
									</g>
									<g transform="matrix(1,0,0,1,-410.66,-410.658)">
										<path
											d="M985.316,1064.8L1030.32,1130.16L976.97,1192.25L567.638,1668.45L466.699,1668.45L931.968,1126.92L985.316,1064.8Z"
											style="fill-rule:nonzero;"
										></path>
									</g>
									<g transform="matrix(1,0,0,1,-410.66,-410.658)">
										<path
											d="M1612.5,452.867L1171.26,966.196L1117.91,1028.25L1072.91,962.886L1126.26,900.797L1425.15,552.907L1511.56,452.867L1612.5,452.867Z"
											style="fill-rule:nonzero;"
										></path>
									</g>
								</svg>
							</a>
						</li>
						<li class="flex size-6 items-center justify-center">
							<a
								href="https://www.tiktok.com/@mydhubeducation?_t=8jGuYP4VdSK&amp;_r=1"
								target="_blank"
								class="flex items-center justify-center rounded-lg"
								aria-label="tiktok"
								><svg class="h-4 w-4" viewBox="0 0 400.5 400.5"
									><path
										class="fill-[#23f3ee]"
										d="m 161.22253,157.7807 v -15.58984 c -5.41016,-0.85547 -10.875,-1.32422 -16.35157,-1.40235 -53.03125,-0.11328 -99.98437,34.25 -115.90625,84.83594 -15.92578,50.58203 2.8711,105.64844 46.40235,135.93359 C 42.75768,326.65961 33.70299,275.85882 52.24987,231.8432 70.79284,187.82757 113.47253,158.81976 161.22253,157.7807"
										id="path2"
									></path><path
										class="fill-[#23f3ee]"
										d="m 164.16393,334.34711 c 29.64844,-0.0391 54.01953,-23.40235 55.32031,-53.02344 V 16.987734 h 48.29297 c -0.98437,-5.52344 -1.45703,-11.1289 -1.40625,-16.73828 H 200.32018 V 264.33148 c -1.10156,29.77344 -25.53125,53.35547 -55.32031,53.40625 -8.90625,-0.0781 -17.66406,-2.26562 -25.55469,-6.38672 10.375,14.3711 26.99219,22.91797 44.71875,22.9961 M 357.97643,106.67523 V 91.983824 c -17.77344,0.004 -35.15234,-5.23828 -49.95312,-15.07812 12.97656,15.08594 30.51172,25.535156 49.95312,29.769526"
										id="path4"
									></path><path
										class="fill-[#fd2b54]"
										d="m 308.02331,76.905704 c -14.58203,-16.60547 -22.6211,-37.94922 -22.61328,-60.04687 h -17.63282 c 4.60157,24.6914 19.15625,46.40624 40.2461,60.04687 M 144.87096,206.83929 c -25.44531,0.13282 -47.53515,17.5625 -53.57812,42.28125 -6.04297,24.71485 5.51172,50.3711 28.02344,62.23047 -12.19532,-16.84375 -13.92188,-39.10547 -4.45704,-57.62109 9.46094,-18.51953 28.50782,-30.16797 49.30469,-30.15235 5.54297,0.0664 11.05078,0.92969 16.35156,2.55469 v -67.20312 c -5.41406,-0.8125 -10.8789,-1.23828 -16.35156,-1.27735 h -2.9414 v 51.10547 c -5.32813,-1.42969 -10.83594,-2.07422 -16.35157,-1.91797"
										id="path6"
									></path><path
										class="fill-[#fd2b54]"
										d="m 357.97643,106.67523 v 51.10547 c -32.90234,-0.0664 -64.94922,-10.48047 -91.60547,-29.76953 v 134.27734 c -0.14062,67.00391 -54.49609,121.2461 -121.5,121.2461 -24.88281,0.043 -49.16797,-7.63282 -69.5039,-21.97657 33.9375,36.5 86.75,48.51563 133.13672,30.28907 46.38671,-18.22657 76.89453,-62.98438 76.90625,-112.82032 V 145.13226 c 26.74218,19.16406 58.82812,29.44141 91.73046,29.38281 V 108.7182 c -6.4414,-0.0195 -12.86328,-0.70313 -19.16406,-2.04297"
										id="path8"
									></path><path
										class="fill-current"
										d="M 266.37096,262.28851 V 128.01117 c 26.73828,19.17969 58.82813,29.46094 91.73438,29.38672 V 106.29242 C 338.66393,102.18695 321.08971,91.874454 308.02331,76.905704 286.93346,63.265074 272.37878,41.550234 267.77721,16.858834 H 219.48424 V 281.32367 c -0.96875,23.59765 -16.76953,43.98828 -39.3789,50.8164 -22.60547,6.82422 -47.05469,-1.41796 -60.91406,-20.53515 -22.51563,-11.85547 -34.07032,-37.51563 -28.02735,-62.23047 6.04297,-24.71484 28.13281,-42.14844 53.57813,-42.27734 5.54687,0.0469 11.05468,0.91015 16.35547,2.55468 v -51.10547 c -48.01954,0.8125 -91.02344,29.92188 -109.6211,74.19922 -18.59375,44.27735 -9.27344,95.36328 23.76563,130.21875 20.53515,13.86719 44.85156,21.05469 69.6289,20.57032 67.00391,0 121.35938,-54.24219 121.5,-121.2461"
										id="path10"
									></path></svg
								></a
							>
						</li>
					</ul>
					<NewsletterForm />
				</div>

				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
					<div class="text-center sm:text-left">
						<p class="text-lg font-medium">About Us</p>

						<div class="mt-6 space-y-2 text-sm flex flex-col">
							<Button href="/about" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Company
							</Button>
							<Button href="/blogs" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Our Blogs
							</Button>
							<Button href="/faqs" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Frequently Asked Questions
							</Button>
							<Button href="/contact" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Contact Us
							</Button>
						</div>
					</div>

					<div class="text-center sm:text-left">
						<p class="text-lg font-medium">Helpful Links</p>

						<div class="mt-6 space-y-2 text-sm flex flex-col">
							<Button href="/services" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Our Services
							</Button>
							<Button href="/courses" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Our Courses
							</Button>
							<Button href="/partners" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Our Partners
							</Button>
							<Button href="/campaigns" variant="link" class="dark:text-white pl-0 md:text-start md:justify-start">
								Our Campaigns
							</Button>
						</div>
					</div>

					<div class="text-center sm:text-left">
						<p class="text-lg font-medium">Contact Us</p>

						<ul class="mt-6 flex flex-col space-y-2 text-sm md:items-start">
							<li>
								<Button
									variant="link"
									class="p-0 hover:bg-transparent dark:text-white"
									href="mailto:dhubeducation@gmail.com"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-5 shrink-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>

									<span class="flex-1">Mail Us</span>
								</Button>
							</li>

							<li>
								<Button
									variant="link"
									class="p-0 hover:bg-transparent dark:text-white"
									href="tel:+447930739927"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-5 shrink-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										/>
									</svg>

									<span class="flex-1">Call Us</span>
								</Button>
							</li>

							<li>
								<Button
									href="https://g.co/kgs/sahVVBt"
									variant="link"
									class="p-0 hover:bg-transparent dark:text-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-5 shrink-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>

									<address class="-mt-0.5 flex-1 not-italic">Locate Us</address>
								</Button>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="mt-12 border-t border-muted-foreground/20 pt-6">
				<div class="gap-2 text-center sm:flex sm:justify-between sm:text-left">
					<p class="flex flex-col text-sm md:flex-row md:gap-1 items-center">
						<span class="block sm:inline">All rights reserved.</span>

						<Button href="/terms-of-use" variant="link" class="dark:text-white pl-0 hover:/75 inline-block underline transition px-0.5">
							Terms & Conditions
						</Button>
						<Button href="/privacy-policy" variant="link" class="dark:text-white pl-0 hover:/75 inline-block underline transition px-0.5">
							Privacy Policy
						</Button>
						
						<Button href="/cookie-policy" variant="link" class="dark:text-white pl-0 hover:/75 inline-block underline transition px-0.5">
							Cookie Policy
						</Button>
					</p>

					<p class="mt-4 text-sm sm:order-first sm:mt-0">
						&copy; {new Date().getFullYear()} DHUB Education
					</p>
				</div>
			</div>
		</div>
	</footer>
</Wrap>
