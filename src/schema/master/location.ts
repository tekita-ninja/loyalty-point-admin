"use client"

import { z } from "zod"

export const formLocationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  latitude: z.coerce.number().min(-90, { message: 'Latitude must be between -90 and 90' }).max(90, { message: 'Latitude must be between -90 and 90' }),
  longitude: z.coerce.number().min(-180, { message: 'Longitude must be between -180 and 180' }).max(180, { message: 'Longitude must be between -180 and 180' }),
})

export type TFormLocation = z.infer<typeof formLocationSchema>

export type TResponseLocation = {
    id: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number
}
