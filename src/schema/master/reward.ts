"use client"

import { z } from "zod"

export const formRewardSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    urlPicture: z.string().min(1, { message: 'Picture URL is required' }),
    price: z.union([z.string(), z.number()]),
    categoryId: z.string().min(1, { message: 'Category is required' }),
    startDate: z.string().min(1, { message: 'Start date is required' }),
    endDate: z.string().min(1, { message: 'End date is required' }),
    stocks: z.union([z.string(), z.number()]),
    isLimited: z.union([z.string(), z.number()])
})

export type TFormReward = z.infer<typeof formRewardSchema>

export type TResponseReward= {
    id: string,
    name: string,
    urlPicture: string,
    price: string,
    startDate: string,
    endDate: string,
    stocks: string,
    isLimited: number,
    category: {
      id: string,
      name: string
    },
    totalLikes: number
}
