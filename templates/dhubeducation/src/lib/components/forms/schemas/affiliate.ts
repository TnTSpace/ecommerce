import { z } from 'zod'

export const referralSchema = z.object({
  fullname: z.string().min(3, { message: 'Name is too short' }),
  email: z.string().email({ message: 'Invalid email address' }),
  paypalEmail: z.string().email({ message: 'Invalid email address' }),
  bankName: z.string().min(3, { message: 'Invalid bank name' }),
  accountName: z.string().min(3, { message: 'Invalid account name' }),
  accountNumber: z.string().min(10, { message: 'Invalid account number' }),
  sortCode: z.string().min(6, { message: 'Invalid sort code' }),
  swiftCode: z.string().min(8, { message: 'Invalid swift code' }),
  gender: z.string().min(4, { message: 'Invalid' }),
  phone: z.string().min(10, { message: 'Invalid phone number' }),
  country: z.string().min(2, { message: 'Invalid country' }),
  type: z.enum(['Customer', 'Teacher', 'Employee', 'Vendor', 'Influencer'], { errorMap: () => ({ message: 'Invalid type' }) }),
})

export const refereeSchema = z.object({
  name: z.string().min(3, { message: 'Name is too short' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Invalid phone number' }),
  gender: z.enum(['male','female'], { errorMap: () => ({ message: 'Invalid gender' }) }),
  country: z.enum(['UK', 'Malta', 'Ireland', 'USA', 'Canada', 'France', 'Finland'], { errorMap: () => ({ message: 'Invalid country' }) }),
  course: z.enum(['A-Level', 'Foundation', 'HND', 'OND', 'Top-Up', 'BSc', 'Pre-MSc', 'MSc', 'PhD'], { errorMap: () => ({ message: 'Invalid course' }) }),
})