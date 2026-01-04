import { courseRegistrationFormSchema } from "$lib/components/forms/schemas/course";
import type { iRegistration } from "$lib/interface";
import { type Action } from "@sveltejs/kit";
import { addRegistration } from '$lib/xata/registration';
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const registerCourse: Action = async (event) => {
  const form = await superValidate(event, zod(courseRegistrationFormSchema))

  if (!form.valid) {
    return fail(400, {
      form,
      messag: 'Invalid form'
    })
  }
  const partialRegistration: Partial<iRegistration> = {
    country: form.data.country,
    email: form.data.email,
    phone: form.data.phone,
    name: form.data.fullname,
    type: "course",
    data: JSON.stringify(form.data)
  }

  const result = await addRegistration(partialRegistration)

  if (result.status === "error") {
    return fail(400, {
      form,
      result
    })
  } else {
    return {
      form, 
      result
    }
  }
}