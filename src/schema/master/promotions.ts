"use client"

import { z } from "zod"

export const formPromotionsSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  subtitle: z.string().min(1, { message: 'Subtitle is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  urlPicture: z.string().url({ message: 'Must be a valid URL' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  isPush: z.union([z.string(), z.number()]),
});

export type TFormPromotions= z.infer<typeof formPromotionsSchema>

export type TResponsePromotions = {
    id: string,
    title: string,
    subtitle: string,
    description: string,
    urlPicture: string,
    startDate: string,
    endDate: string,
    isPush: number
}
