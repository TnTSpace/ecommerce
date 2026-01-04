<script lang="ts">
	import { helpCenter } from '$lib/constants';
	import { page } from '$app/state';
	import Educational from '$lib/components/widgets/Educational.svelte';
	import type { iSection } from '$lib/interface';

	const sections: iSection[] = [
		{
			id: 'who-we-are',
			title: 'Who We Are',
			content: `
      <p>DHUB Education is a leading education consultant dedicated to providing unparalleled support and guidance to international students and universities worldwide.</p>
      <p>Our team of committed professionals works tirelessly to offer expert advice and assistance, ensuring a seamless educational journey from foundation level to Ph.D.</p>
    `
		},
		{
			id: 'why-we-are-here',
			title: 'Why We Are Here',
			content: `
      <p>At DHUB Education, our vision is clear - to create a distinguished quality service for all students, with a special emphasis on science students and education providers.</p>
      <p>We believe in fostering self-discovery, knowledge construction, and transformation, empowering each student to make the best university choices with ease and support.</p>
    `
		},
		{
			id: 'what-we-do',
			title: 'What We Do',
			content: `
      <p>We specialize in guiding your educational journey with a comprehensive suite of services tailored to your individual needs:</p>
      <ul>
        <li>Helping you find the perfect school that aligns with your goals and budget.</li>
        <li>Providing valuable insights on managing educational expenses.</li>
        <li>Ensuring a safe and nurturing environment for students away from home.</li>
        <li>Offering expert advice on course selection.</li>
        <li>Assisting in finding comfortable living arrangements.</li>
        <li>Guiding students through complex visa processes for a seamless transition.</li>
      </ul>
      <p>Our range of services is designed to support every aspect of your educational experience – and that's just the beginning.</p>
    `
		},
		{
			id: 'the-team',
			title: 'The Team',
			content: `
      <p>Our team at DHUB Education comprises passionate individuals with diverse backgrounds, including education, healthcare, business development, and more.</p>
      <p>We unite under a common ambition: to address the world's most pressing health issues. With our combined expertise, we are committed to building an educational platform that produces the next generation of healthcare professionals and NHS heroes.</p>
      <p>With a focus on science-based education, DHUB Education is uniquely positioned to guide students towards fulfilling careers in nursing and other healthcare-related fields.</p>
      <p>Our dedicated team ensures that every student receives personalized guidance and support throughout their educational journey.</p>
    `
		},
		{
			id: 'our-values',
			title: 'Our Values',
			content: `
      <ul>
        <li><strong>Excellence:</strong> We strive to provide top-tier education consulting services.</li>
        <li><strong>Integrity:</strong> We operate with honesty and transparency in every interaction.</li>
        <li><strong>Innovation:</strong> We continuously improve our approaches to better serve students and universities.</li>
        <li><strong>Commitment:</strong> We are dedicated to supporting students in achieving their academic dreams.</li>
      </ul>
    `
		},
		{
			id: 'our-approach',
			title: 'Our Approach',
			content: `
      <p>At DHUB Education, we take a personalized approach to education consulting. Every student is unique, and we tailor our services to meet their specific needs and aspirations.</p>
      <p>Our data-driven insights, combined with years of experience, allow us to provide strategic guidance that maximizes success.</p>
    `
		},
		{
			id: 'partnerships',
			title: 'Partnerships and Collaborations',
			content: `
      <p>We collaborate with top universities, education providers, and organizations globally to create opportunities for students.</p>
      <p>Our partnerships ensure access to scholarships, research opportunities, and career development programs that enhance the overall educational experience.</p>
    `
		},
		{
			id: 'get-in-touch',
			title: 'Get in Touch',
			content: `
      <p>Are you ready to embark on your educational journey with DHUB Education?</p>
      <p>Contact us today for expert guidance and support: <a href="mailto:dhubeducation@gmail.com">dhubeducation@gmail.com</a>.</p>
    `
		}
	];

	const url = page.url;
</script>

<Educational
	{url}
	pages={helpCenter}
	title="About Us"
	offset={112}
	{sections}
	lastUpdated="January 30, 2025"
	top="top-[112px]"
/>
