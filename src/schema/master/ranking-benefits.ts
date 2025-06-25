"use client"

import { z } from "zod"

export const formRankingBenefits = z.object({
  rankingId: z.string(),
  benefitIds: z.array(z.string()).optional(),
})

export type TFormRankingBenefits = z.infer<typeof formRankingBenefits>
