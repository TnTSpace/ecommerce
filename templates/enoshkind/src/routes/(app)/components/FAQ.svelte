<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion';

	const faqs = [
		{
			question: 'How do I book a lab test?',
			answer:
				'You can browse our list of tests in the "Laboratory & DNA" section, select the one you need, and pay securely. You\'ll receive a digital code to visit any partner lab.'
		},
		{
			question: 'How is the diet tracking monitored?',
			answer:
				'When you log a meal, our AI provides instant feedback based on your specific chronic condition. You can also share these logs with our clinical dietitians for expert advice.'
		},
		{
			question: 'Can I consult with a specialist via video?',
			answer:
				'Yes! Our Telemedicine module allows you to book high-quality video consultations with verified doctors and dietitians across Nigeria.'
		},
		{
			question: 'What kind of DNA tests do you offer?',
			answer:
				'We offer comprehensive DNA screening that covers genetic health predispositions, ancestry, and personalized nutrition plans based on your genetic blueprint.'
		},
		{
			question: 'Is my medical data kept private?',
			answer:
				'Absolutely. We use bank-grade encryption and follow strict HIPAA-compliant protocols to ensure your health information remains 100% private and secure.'
		},
		{
			question: 'Can I upload my own test results?',
			answer:
				'Yes, you can upload PDF or image results from any laboratory. Our platform will securely store them and can provide AI-powered interpretations.'
		}
	];
</script>

<section class="py-24">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16 max-w-2xl mx-auto">
			<Badge variant="secondary" class="mb-4">FAQ</Badge>
			<h2 class="text-3xl md:text-4xl font-bold mb-4">
				Common <span class="text-primary">Questions</span>
			</h2>
			<p class=" text-muted-foreground">Everything you need to know about EnoshKind.</p>
		</div>

		<div class="max-w-2xl mx-auto">
			<Accordion type="single">
				{#each faqs as faq, i}
					<AccordionItem value={`item-${i}`}>
						<AccordionTrigger>{faq.question}</AccordionTrigger>
						<AccordionContent>
							<p class="text-muted-foreground">{faq.answer}</p>
						</AccordionContent>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	</div>
</section>
