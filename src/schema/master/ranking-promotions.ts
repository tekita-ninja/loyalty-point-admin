"use client"

import { z } from "zod"

export const formRankingPromotionsSchema = z.object({
  rankingId: z.string(),
  promotionIds: z.array(z.string()).optional(),
})

export type TFormRankingPromotions = z.infer<typeof formRankingPromotionsSchema>
