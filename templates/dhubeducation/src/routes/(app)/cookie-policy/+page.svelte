<script lang="ts">
	import Educational from '$lib/components/widgets/Educational.svelte';
	import { helpCenter } from '$lib/constants';
	import { page } from '$app/state';
	import type { iSection } from '$lib/interface';

	const sections: iSection[] = [
		{
			id: 'introduction',
			title: 'Introduction',
			content: `
      <p>This Cookie Policy explains how DHUB Education uses cookies and similar technologies to enhance your browsing experience.</p>
      <p>By using our website, you agree to the use of cookies as described in this policy.</p>
    `
		},
		{
			id: 'what-are-cookies',
			title: 'What Are Cookies?',
			content: `
      <p>Cookies are small text files stored on your device when you visit a website. They help in recognizing your preferences and improving your user experience.</p>
    `
		},
		{
			id: 'how-we-use-cookies',
			title: 'How We Use Cookies',
			content: `
      <p>We use cookies to:</p>
      <ul>
        <li>Enhance website functionality</li>
        <li>Analyze user behavior and improve our services</li>
        <li>Personalize content and advertisements</li>
        <li>Ensure security and prevent fraud</li>
      </ul>
    `
		},
		{
			id: 'types-of-cookies',
			title: 'Types of Cookies We Use',
			content: `
      <ul>
        <li><strong>Essential Cookies:</strong> Necessary for website functionality.</li>
        <li><strong>Analytical Cookies:</strong> Help us understand user interactions.</li>
        <li><strong>Functional Cookies:</strong> Remember user preferences.</li>
        <li><strong>Advertising Cookies:</strong> Used to display relevant ads.</li>
      </ul>
    `
		},
		{
			id: 'managing-cookies',
			title: 'Managing Cookies',
			content: `
      <p>You can manage or disable cookies through your browser settings. However, disabling essential cookies may impact website functionality.</p>
    `
		},
		{
			id: 'third-party-cookies',
			title: 'Third-Party Cookies',
			content: `
      <p>We may use third-party cookies for analytics and advertising purposes. These cookies are subject to the policies of the respective third parties.</p>
    `
		},
		{
			id: 'changes-policy',
			title: 'Changes to This Cookie Policy',
			content: `
      <p>We may update this Cookie Policy from time to time. Any changes will be communicated via our website.</p>
    `
		},
		{
			id: 'contact-information',
			title: 'Contact Information',
			content: `
      <p>If you have any questions about this Cookie Policy, please contact us at <a href="mailto:dhubeducation@gmail.com">dhubeducation@gmail.com</a>.</p>
    `
		}
	];
</script>

<Educational
	pages={helpCenter}
	title="Cookie Policy"
	offset={112}
	{sections}
	url={page.url}
	lastUpdated="January 30, 2025"
	top="top-[112px]"
/>
