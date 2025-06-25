"use client"

import { z } from "zod"

export const formLocationRewardsSchema = z.object({
  locationId: z.string(),
  rewardIds: z.array(z.string()).optional(),
})

export type TFormLocationRewards = z.infer<typeof formLocationRewardsSchema>
