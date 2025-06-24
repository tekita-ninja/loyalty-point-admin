"use client"

import { z } from "zod"

export const formRulePointSchema = z.object({
  multiplier: z.union([z.string(), z.number()]),
  isActive: z.union([z.string(), z.number()])
});

export type TFormRulePoint = z.infer<typeof formRulePointSchema>

export type TResponseRulePoint = {
    id: string,
    multiplier: string,
    isActive: number
}
