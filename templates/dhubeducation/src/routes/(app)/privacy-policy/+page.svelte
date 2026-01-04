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
      <p>Welcome to DHUB Education. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your personal information.</p>
      <p>By using our services, you consent to the practices described in this policy.</p>
    `
		},
		{
			id: 'information-collected',
			title: 'Information We Collect',
			content: `
      <p>We collect various types of information, including:</p>
      <ul>
        <li>Personal information (name, email, phone number, etc.) provided during registration</li>
        <li>Usage data such as IP addresses, browser type, and access times</li>
        <li>Cookies and tracking technologies to enhance your experience</li>
      </ul>
    `
		},
		{
			id: 'use-of-information',
			title: 'How We Use Your Information',
			content: `
      <p>We use the information collected to:</p>
      <ul>
        <li>Provide and improve our services</li>
        <li>Personalize your experience</li>
        <li>Communicate with you regarding updates, offers, and support</li>
        <li>Ensure security and prevent fraudulent activities</li>
      </ul>
    `
		},
		{
			id: 'data-sharing',
			title: 'Data Sharing and Disclosure',
			content: `
      <p>We do not sell or rent your personal data. However, we may share information with:</p>
      <ul>
        <li>Service providers assisting in platform operations</li>
        <li>Legal authorities when required by law</li>
        <li>Business partners in case of mergers or acquisitions</li>
      </ul>
    `
		},
		{
			id: 'data-security',
			title: 'Data Security',
			content: `
      <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction.</p>
      <p>While we strive for security, no method of transmission over the internet is 100% secure.</p>
    `
		},
		{
			id: 'user-rights',
			title: 'Your Rights and Choices',
			content: `
      <p>You have the right to:</p>
      <ul>
        <li>Access, update, or delete your personal data</li>
        <li>Opt out of marketing communications</li>
        <li>Request data portability where applicable</li>
      </ul>
    `
		},
		{
			id: 'cookies-policy',
			title: 'Cookies and Tracking Technologies',
			content: `
      <p>We use cookies to enhance your browsing experience. You can manage cookie preferences through your browser settings.</p>
    `
		},
		{
			id: 'changes-policy',
			title: 'Changes to This Privacy Policy',
			content: `
      <p>We may update this policy from time to time. Any changes will be communicated via email or posted on our platform.</p>
    `
		},
		{
			id: 'contact-information',
			title: 'Contact Information',
			content: `
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:dhubeducation@gmail.com">dhubeducation@gmail.com</a>.</p>
    `
		}
	];
</script>

<Educational
	pages={helpCenter}
	title="Privacy Policy"
	offset={112}
	{sections}
	url={page.url}
	lastUpdated="January 30, 2025"
	top="top-[112px]"
/>
