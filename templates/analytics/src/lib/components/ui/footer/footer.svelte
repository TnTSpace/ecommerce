<script lang="ts" module>
	import type { iContactRoute, iLegalRoute, iRoute, iSoMeRoute } from '../../../interface/index';
	let someRoutes: iSoMeRoute[] = [
		{
			name: 'facebook',
			href: 'https://www.facebook.com/mydhubeducation/'
		},
		{
			name: 'instagram',
			href: 'https://www.instagram.com/mydhubeducation/'
		},
		{
			name: 'twitter',
			href: 'https://twitter.com/DhubEducation'
		},
		{
			name: 'tiktok',
			href: 'https://www.tiktok.com/@mydhubeducation?_t=8jGuYP4VdSK&amp;_r=1'
		},
		{
			name: 'youtube',
			href: 'https://www.youtube.com/@dhubeducation2325'
		},
		// {
		// 	name: "telegram",
		// 	href: "https://t.me/+EFfR1U0_BakwNjlk"
		// },
		{
			name: 'whatsapp',
			href: createWhatsAppUrl('Hello', '+447930739927')
		}
	];

	let contactRoutes: iContactRoute[] = [
		{
			name: 'call',
			href: 'tel:+447930739927'
		},
		{
			name: 'locate',
			href: 'https://g.co/kgs/sahVVBt'
		},
		{
			name: 'mail',
			href: 'mailto:dhubeducation@gmail.com'
		}
	];

	let legalRoutes: iLegalRoute[] = [
		{
			name: 'terms of use',
			href: '/terms-of-use'
		},
		{
			name: 'privacy policy',
			href: '/privacy-policy'
		},
		{
			name: 'cookie policy',
			href: '/cookie-policy'
		}
	];

	let aboutRoutes: iRoute[] = [
		{
			name: 'About Us',
			href: '/about'
		},
		{
			name: 'Blogs',
			href: '/blogs'
		},
		{
			name: 'Frequently Asked Questions',
			href: '/faqs'
		},
		{
			name: 'Contact Us',
			href: '/contact'
		}
	];

	let helpfulRoutes: iRoute[] = [
		{
			name: 'Services',
			href: '/services'
		},
		{
			name: 'Courses',
			href: '/courses'
		},
		{
			name: 'Partners',
			href: '/partners'
		}
	];
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { isExcludedFromFooter } from '../../../constants/index';
	import { cn } from '../../../utils/index';
	import { Button } from '../button';
	import Wrap from '../wrap/wrap.svelte';
	import Facebook from '../../icons/facebook.svelte';
	import Instagram from '../../icons/instagram.svelte';
	import Twitter from '../../icons/twitter.svelte';
	import Tiktok from '../../icons/tiktok.svelte';
	import Telegram from '../../icons/telegram.svelte';
	import Whatsapp from '../../icons/whatsapp.svelte';
	import Youtube from '../../icons/youtube.svelte';
	import Email from '../../icons/email.svelte';
	import Call from '../../icons/call.svelte';
	import Locate from '../../icons/locate.svelte';
	import { createWhatsAppUrl } from '../../../fxns/index';

	interface Props {
		logo: any;
		organizationName: string;
		slogan: string;
		some?: iSoMeRoute[];
		about?: iRoute[];
		helpful?: iRoute[];
		contact?: iContactRoute[];
		legal?: iRoute[];
	}

	let {
		logo: Brand,
		slogan,
		organizationName,
		some = someRoutes,
		about = aboutRoutes,
		helpful = helpfulRoutes,
		contact = contactRoutes,
		legal = legalRoutes
	}: Props = $props();
	const pathname = page.url.pathname;
	const excluded = isExcludedFromFooter(pathname);

	const getSomeIcon = (route: iSoMeRoute) => {
		switch (route.name) {
			case 'facebook':
				return Facebook;
			case 'instagram':
				return Instagram;
			case 'telegram':
				return Telegram;
			case 'tiktok':
				return Tiktok;
			case 'twitter':
				return Twitter;
			case 'whatsapp':
				return Whatsapp;
			case 'youtube':
				return Youtube;
		}
	};

	const getContactIcon = (route: iContactRoute) => {
		switch (route.name) {
			case 'call':
				return Call;
			case 'locate':
				return Locate;
			case 'mail':
				return Email;
		}
	};
</script>

<Wrap class={cn('border-t bg-[#f5f5f5] pb-14 dark:bg-secondary md:pb-0', excluded && 'md:hidden')}>
	<footer>
		<div class="pb-6 pt-16 lg:pt-24">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div>
					<div class="flex justify-center sm:justify-start">
						<Brand />
					</div>

					<p class="mt-6 text-center text-sm leading-relaxed sm:max-w-md sm:text-left">
						{slogan}
					</p>

					<div class="mt-8 flex items-center justify-center gap-2 sm:justify-start">
						{#each some as route, i}
							{@const Icon = getSomeIcon(route)}
							<Button size="icon" variant="outline" class="p-0">
								<span class="sr-only">{route.name}</span>
								<Icon class="size-6" />
							</Button>
						{/each}
					</div>
				</div>

				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
					<div class="text-center sm:text-left">
						<p class="text-lg font-medium">Who We Are</p>

						<div class="mt-8 flex flex-col text-sm">
							{#each about as item, i}
								<Button
									href={item.href}
									variant="link"
									class="pl-0 dark:text-white md:justify-start md:text-start"
								>
									{item.name}
								</Button>
							{/each}
						</div>
					</div>

					<div class="text-center sm:text-left">
						<p class="text-lg font-medium">Helpful Links</p>

						<div class="mt-8 flex flex-col text-sm">
							{#each helpful as item, i}
								<Button
									href={item.href}
									variant="link"
									class="pl-0 dark:text-white md:justify-start md:text-start"
								>
									{item.name}
								</Button>
							{/each}
						</div>
					</div>

					<div class="text-center sm:text-left">
						<p class="text-lg font-medium">Contact Us</p>

						<div class="mt-8 flex flex-col text-sm md:items-start">
							{#each contact as route, i}
								{@const Icon = getContactIcon(route)}
								<Button
									href={route.href}
									class="pl-0 dark:text-white md:justify-start md:text-start"
									variant="link"
								>
									<Icon class="size-6" />
									<span class="capitalize">{route.name} Us</span>
								</Button>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div class="mt-12 border-t border-muted-foreground/20 pt-6">
				<div class="gap-2 text-center sm:flex sm:justify-between sm:text-left">
					<p class="flex flex-col items-center text-sm md:flex-row md:gap-1">
						<span class="block sm:inline">All rights reserved.</span>

						{#each legal as route, i}
							<Button
								href={route.href}
								variant="link"
								class="hover:/75 inline-block px-0.5 pl-0 capitalize underline transition dark:text-white"
							>
								{route.name}
							</Button>
						{/each}
					</p>

					<p class="mt-4 text-sm sm:order-first sm:mt-0">
						&copy; {new Date().getFullYear()}
						{organizationName}
					</p>
				</div>
			</div>
		</div>
	</footer>
</Wrap>
