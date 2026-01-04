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
      <p>Welcome to our platform. These Terms of Use govern your access to and use of our website, products, and services. By using our services, you agree to comply with these terms.</p>
      <p>If you do not agree with any part of these terms, please refrain from using our services.</p>
    `
		},
		{
			id: 'eligibility',
			title: 'Eligibility',
			content: `
      <p>To use our services, you must be at least 18 years old or have the legal capacity to enter into agreements under your jurisdiction.</p>
      <p>By using our platform, you confirm that you meet these eligibility requirements.</p>
    `
		},
		{
			id: 'user-responsibilities',
			title: 'User Responsibilities',
			content: `
      <p>You agree to use our services only for lawful purposes and in compliance with all applicable laws and regulations.</p>
      <p>Prohibited activities include, but are not limited to:</p>
      <ul>
        <li>Engaging in fraudulent or deceptive practices</li>
        <li>Uploading malicious software or harmful code</li>
        <li>Violating intellectual property rights</li>
      </ul>
    `
		},
		{
			id: 'account-security',
			title: 'Account Security',
			content: `
      <p>You are responsible for maintaining the confidentiality of your account credentials. Any activity occurring under your account is your responsibility.</p>
      <p>We reserve the right to suspend or terminate accounts suspected of unauthorized access or fraudulent activity.</p>
    `
		},
		{
			id: 'intellectual-property',
			title: 'Intellectual Property',
			content: `
      <p>All content, trademarks, and intellectual property on our platform belong to us or our licensors.</p>
      <p>You may not reproduce, distribute, or modify any content without prior written permission.</p>
    `
		},
		{
			id: 'termination',
			title: 'Termination of Use',
			content: `
      <p>We reserve the right to suspend or terminate your access to our services at any time for violations of these terms.</p>
      <p>Upon termination, your rights to use our services cease immediately.</p>
    `
		},
		{
			id: 'limitation-liability',
			title: 'Limitation of Liability',
			content: `
      <p>We are not liable for any indirect, incidental, or consequential damages resulting from your use of our services.</p>
      <p>Our total liability for any claim shall not exceed the amount you paid, if any, for using our services.</p>
    `
		},
		{
			id: 'governing-law',
			title: 'Governing Law',
			content: `
      <p>These terms shall be governed by and interpreted in accordance with the laws of [Your Jurisdiction].</p>
      <p>Disputes arising from these terms shall be resolved in the courts of [Your Jurisdiction].</p>
    `
		},
		{
			id: 'modifications',
			title: 'Modifications to Terms',
			content: `
      <p>We reserve the right to modify these Terms of Use at any time.</p>
      <p>We will notify users of significant changes, and continued use of our services constitutes acceptance of the revised terms.</p>
    `
		},
		{
			id: 'contact',
			title: 'Contact Information',
			content: `
      <p>If you have any questions regarding these Terms of Use, please contact us at <a href="mailto:dhubeducation@gmail.com">dhubeducation@gmail.com</a>.</p>
    `
		}
	];
</script>

<Educational
	pages={helpCenter}
	title="Terms of Use"
	offset={112}
	url={page.url}
	{sections}
	lastUpdated="January 30, 2025"
	top="top-[112px]"
/>
