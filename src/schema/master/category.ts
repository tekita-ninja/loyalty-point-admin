"use client"

import { z } from "zod"

export const formCategorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
})

export type TFormCategory = z.infer<typeof formCategorySchema>

export type TResponseCategory= {
    id: string,
    name: string,
}
