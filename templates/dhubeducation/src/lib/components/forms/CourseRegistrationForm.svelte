<script lang="ts">
	import type { iCourse } from '$lib/interface';
	import { superForm, type Infer, type SuperValidated, defaultValues } from 'sveltekit-superforms';
	import {
		courseRegistrationFormSchema,
		type CourseRegistrationFormSchema
	} from './schemas/course';

	import * as Form from '$lib/components/ui/form/index.js';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { Input, inputDefaultClasses } from '$lib/components/ui/input';
	import { Card } from '$lib/components/ui/card';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import * as Select from '$lib/components/ui/select';
	import { genderlist, educationlist, preferredday, courseformat } from '$lib/constants';
	import type { CountryCode } from 'svelte-tel-input/types';
	import { toast } from 'svelte-sonner';
	import type { iResult } from '@toolsntuts/utils';

	interface Props {
		courses: iCourse[];
		form: SuperValidated<Infer<CourseRegistrationFormSchema>>;
	}

	let { courses, form: dataForm }: Props = $props();

	const defaults = defaultValues(zod(courseRegistrationFormSchema));

	let loading = $state(false);
	let country = $state<CountryCode>('NG');

	const courselist = courses.map((course) => ({
		label: course.name,
		value: course.name
	}));

	const form = superForm(dataForm, {
		validators: zodClient(courseRegistrationFormSchema),
		onSubmit: () => {
			loading = true;
		},
		onResult: ({ result }) => {
			console.log({ result });
			if (result.type === 'failure') {
				const { message } = result?.data?.result as iResult;
				toast.error(message);
			} else {
				form.reset();
				toast.success('Successfully registered for the course');
			}
			loading = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card class="space-y-2 p-4">
	<h2 class="text-center text-lg font-semibold md:text-2xl">Fill the form below to register</h2>
	<form method="POST" action="?/registerCourse" use:enhance class="flex flex-col items-center justify-center gap-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
			<Form.Field {form} name="fullname">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Full name</Form.Label>
						<Input {...props} bind:value={$formData.fullname} />
					{/snippet}
				</Form.Control>
				<Form.Description>Enter your full name</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} type="email" bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.Description>Enter your email</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="phone">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Phone</Form.Label>
						<PhoneInput
							{country}
							{...props}
							bind:value={$formData.phone}
							class="w-full max-w-full"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Enter your phone number</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="gender">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Gender</Form.Label>
						<Select.Root type="single" bind:value={$formData.gender} name={props.name}>
							<Select.Trigger {...props} class="text-start capitalize">
								{$formData.gender ? $formData.gender : 'Choose'}
							</Select.Trigger>
							<Select.Content>
								{#each genderlist as { value, label }, i}
									<Select.Item {label} {value} />
								{/each}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.Description>Choose Gender</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="city">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>City</Form.Label>
						<Input {...props} bind:value={$formData.city} />
					{/snippet}
				</Form.Control>
				<Form.Description>Enter your city</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="country">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Country</Form.Label>
						<Input {...props} bind:value={$formData.country} />
					{/snippet}
				</Form.Control>
				<Form.Description>Enter your country</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="education">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Education</Form.Label>
						<Select.Root type="single" bind:value={$formData.education} name={props.name}>
							<Select.Trigger {...props} class="text-start capitalize">
								{$formData.education ? $formData.education : 'Choose'}
							</Select.Trigger>
							<Select.Content>
								{#each educationlist as { value, label }, i}
									<Select.Item {label} {value} />
								{/each}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.Description>Choose Education</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="employer">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Employer</Form.Label>
						<Input {...props} bind:value={$formData.employer} />
					{/snippet}
				</Form.Control>
				<Form.Description>Former Employer</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="jobtitle">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Job Title</Form.Label>
						<Input {...props} bind:value={$formData.jobtitle} />
					{/snippet}
				</Form.Control>
				<Form.Description>Former Job Title</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="experience">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Experience</Form.Label>
						<Input {...props} bind:value={$formData.experience} />
					{/snippet}
				</Form.Control>
				<Form.Description>Years of Experience</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="course">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Course</Form.Label>
						<Select.Root type="single" bind:value={$formData.course} name={props.name}>
							<Select.Trigger {...props} class="text-start capitalize">
								{$formData.course ? $formData.course : 'Choose'}
							</Select.Trigger>
							<Select.Content>
								{#each courselist as { value, label }, i}
									<Select.Item {label} {value} />
								{/each}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.Description>Choose Course</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="preferredday">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Preferred Day</Form.Label>
						<Select.Root type="single" bind:value={$formData.preferredday} name={props.name}>
							<Select.Trigger {...props} class="text-start capitalize">
								{$formData.preferredday ? $formData.preferredday : 'Choose'}
							</Select.Trigger>
							<Select.Content>
								{#each preferredday as { value, label }, i}
									<Select.Item {label} {value} />
								{/each}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.Description>Choose Preferred Day</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="courseformat">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Course Format</Form.Label>
						<Select.Root type="single" bind:value={$formData.courseformat} name={props.name}>
							<Select.Trigger {...props} class="text-start capitalize">
								{$formData.courseformat ? $formData.courseformat : 'Choose'}
							</Select.Trigger>
							<Select.Content>
								{#each courseformat as { value, label }, i}
									<Select.Item {label} {value} />
								{/each}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.Description>Choose Preferred Course Format</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="dateofbirth">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Date of birth</Form.Label>
						<input
							class={inputDefaultClasses}
							type="date"
							{...props}
							bind:value={$formData.dateofbirth}
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Select your date of birth</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		{#if loading}
			<Button class="w-full md:w-[200px]">
				<SpinLoader />
			</Button>
		{:else}
			<Form.Button class="w-full md:w-fit">Submit</Form.Button>
		{/if}
	</form>
</Card>
