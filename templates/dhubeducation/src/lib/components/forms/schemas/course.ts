import { z } from 'zod'

export const courseRegistrationFormSchema = z.object({
  fullname: z.string().min(3, { message: 'Name is too short' }),
  email: z.string().email({ message: 'Invalid email address' }),
  dateofbirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format' }),
  gender: z.string().min(4, { message: 'Invalid'}),
  phone: z.string().min(10, { message: 'Invalid phone number' }),
  city: z.string().min(3, { message: 'Invalid city name' }),
  education: z.string().min(3, { message: 'Invalid education' }),
  employer: z.string().min(3, { message: 'Invalid employer' }),
  jobtitle: z.string().min(3, { message: 'Invalid job title' }),
  experience: z.string().min(3, { message: 'Invalid experience' }),
  preferredday: z.string().min(3, { message: 'Invalid preferred day' }),
  courseformat: z.string().min(3, { message: 'Invalid course format' }),
  course: z.string().min(3, { message: 'Invalid course' }),
  country: z.string().min(2, { message: 'Invalid country' })
})

export type CourseRegistrationFormSchema = typeof courseRegistrationFormSchema

export type iCourseRegistration = typeof courseRegistrationFormSchema._input