<script lang="ts" module>
	
	// Sample reviews array, could be passed as props or fetched dynamically
	const reviews: iReview[] = [
		{
			name: 'Clarence Olympio',
			image:
				'https://lh3.googleusercontent.com/a-/ALV-UjW95vrX4sSrbhM50EtRrA7VWUdOba6UpM3EoRwzbsP-uSELbMw=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>With DHUB Education, I had a truly wonderful experience. They provided essential support and guidance throughout my journey—from the moment I decided to study abroad to the day I arrived at my destination.</p>
			<p>I highly recommend DHUB Education to anyone considering studying abroad. Their dedicated team, attention to detail, and commitment to student welfare set them apart. They helped make my dream of studying abroad a reality, and I wouldn't hesitate to choose them again.</p>
			<p><strong>Clarence from Ghana 🇬🇭</strong></p>
		`
		},
		{
			name: 'Motolani Teibo',
			image:
				'https://lh3.googleusercontent.com/a/ACg8ocLe3mczX4TJRL1GBccAU4uuhy39gSniG2xsug_5Z5BvqTk4Og=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>My experience with DHUB Education was amazing. From the onset, Damilola handled my son's case and delivered promptly—from the school application process to the visa application.</p>
			<p>She responded to all my concerns at any time and provided reassuring support. The professionalism demonstrated during the visa application process was exceptional, and the final outcome brought happiness to my family.</p>
			<p>Many thanks!</p>
		`
		},
		{
			name: 'Avuwakoghene Rume',
			image:
				'https://lh3.googleusercontent.com/a-/ALV-UjU5jYpCE9L2JCfba3dyrxCoIVsMpAS-AIQlcejFxBdas1gu94XZ=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>I’d like to thank DHUB Education for their support during my MMU application—it was a huge success. </p>
			<p>Tested and trusted. 100% reliable!</p>
		`
		},
		{
			name: "T'z Mhizta Marcelo",
			image:
				'https://lh3.googleusercontent.com/a-/ALV-UjVDBaD_fNLSSJ_qTy2l4Sv1befyvO_DSyEWQfi0i5YBhFs70bEZ=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>DHUB Education is the most reliable platform for gaining admission to universities and schools worldwide. I am a testimony—I successfully gained admission into Middlesex University London through DHUB Education.</p>
			<p>I highly recommend DHUB Education to anyone looking to secure admission to international institutions. Their service is outstanding.</p>
			<p><strong>Regards, @Marcelo</strong></p>
		`
		},
		{
			name: 'Ekene Obi',
			image:
				'https://lh3.googleusercontent.com/a-/ALV-UjWebWZWVpd1JKSySggnCgFBkEKgYGoxffVdM-g5HPFZKXNLFM9a=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>Dhub's service is top-notch and highly professional. They maintain an excellent agent-client relationship, are patient, and are experts in their field.</p>
			<p>I highly recommend their services.</p>
		`
		},
		{
			name: 'Winnie Schola',
			image:
				'https://lh3.googleusercontent.com/a/ACg8ocIo0Klo2itxQMs-52BRjt9qFw3MBtDrcN_Hi-oQV5cBUUrP7g=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>I had a great experience with DHUB Education. Their service was exceptional, and they maintained friendly and professional communication.</p>
			<p>They are compassionate, understanding, and dedicated to ensuring customer satisfaction. DHUB Education is the best in the United Kingdom.</p>
			<p><strong>Positive communication, quality service, professionalism, and great value!</strong></p>
		`
		},
		{
			name: 'Chinyere OmeniNzewuihe',
			image:
				'https://lh3.googleusercontent.com/a/ACg8ocKmZZv48sRcgIp1TiMyLWDNQUDFrw6P8b3HTW-bzMd1b7Snbg=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>With DHUB Education, you are guaranteed the best results.</p>
			<p>I highly recommend their services!</p>
		`
		},
		{
			name: 'Gloria Adelaja',
			image:
				'https://lh3.googleusercontent.com/a/ACg8ocLjDTKBrleJMn90WBRmkb9g2creOUBZTYhpaF18iPRr9GRYyw=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>DHUB Education is the best! They helped me through the entire process, and now I am in the UK.</p>
		`
		},
		{
			name: 'Michael Mukaila',
			image:
				'https://lh3.googleusercontent.com/a-/ALV-UjWaV6AQdqeV6IZmxSRwdWauDXQNOfSRGEQPIka13rrVOCPb374I=s40-c-rp-mo-br100',
			rating: '5',
			review: `
			<p>Thank you for the support and guidance I received from DHUB Education.</p>
			<p>I will definitely be referring others!</p>
		`
		}
	];
</script>
<script lang="ts">
	// Define the review type
	interface iReview {
		name: string;
		image: string;
		rating: string;
		review: string;
	}

	interface Props {
		length?: number
	}

	let { length = reviews.length }: Props = $props()

</script>

<section>
	<div class="w-full center">
		<h2 class="mb-8 text-center text-3xl font-semibold">What Our Clients Say</h2>

		<!-- Review Grid -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each reviews.slice(0, length) as review, i}
				<div
					class="rounded-lg bg-white p-6 shadow-xl transition duration-300 ease-in-out hover:shadow-2xl dark:bg-secondary"
				>
					<div class="mb-4 flex items-center">
						<img
							src={review.image}
							alt={review.name}
							loading="lazy"
							class="mr-4 h-16 w-16 rounded-full border-4 border-primary dark:border-white"
						/>
						<div class="text-start">
							<h3 class="font-semibold capitalize">{review.name}</h3>
							<div class="flex items-center">
								{#each Array(+review.rating) as _, index (index)}
									<span class="text-sm text-yellow-400">★</span>
								{/each}
								{#each Array(5 - +review.rating) as _, index (index)}
									<span class="text-sm text-gray-300">★</span>
								{/each}
							</div>
						</div>
					</div>
					<div class="prose text-foreground dark:prose-invert">
						{@html review.review}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
