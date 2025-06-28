"use client"

import { z } from "zod"

export const formRulePointSchema = z.object({
  multiplier: z.union([z.string(), z.number()]),
  isActive: z.union([z.string(), z.number()]),
  name: z.string().min(1, { message: 'Name is required' }),
  startDate: z.string().optional(), 
  endDate: z.string().optional(),
});

export type TFormRulePoint = z.infer<typeof formRulePointSchema>

export type TResponseRulePoint = {
    id: string,
    name: string,
    endDate: string | null,
    startDate: string | null,
    multiplier: string,
    isActive: number
}
