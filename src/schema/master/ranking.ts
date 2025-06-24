"use client"

import { z } from "zod"

export const formRankingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  minPoints: z.coerce.number().min(1, { message: "Minimum points must be at least 1" }),
  minSpendings: z.coerce.number().min(1, { message: "Minimum points must be at least 1" }),
  rulePointId: z.string().min(1, { message: "Rule Point Id is required" }),
});

export type TFormRanking = z.infer<typeof formRankingSchema>

export type TResponseRanking = {
    id: string,
    name: string,
    minPoints: number,
    minSpendings: number,
    rulePoint: {
        id: string
        multiplier: number
    }
}