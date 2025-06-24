"use client"

import { z } from "zod"

export const formBenefitSchema = z.object({
  title: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Code is required' }),
})

export type TFormBenefit= z.infer<typeof formBenefitSchema>

export type TResponseBenefit= {
    id: string,
    title: string,
    description: string
}
