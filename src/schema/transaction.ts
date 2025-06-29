"use client"

import { z } from "zod"
import { TResponseUser } from "./user"
import { TResponseReward } from "./master/reward"
import { TResponseLocation } from "./master/location"

export const formTransactionSchema = z.object({
  userId: z.string().min(1, { message: 'Customer is required' }),
  locationId: z.string().min(1, { message: 'Location is required' }),
  rewardId: z.string().min(1, { message: 'Reward is required' }),
  qty: z.preprocess(
    (val) => {
      // Ubah string menjadi number jika perlu
      if (typeof val === 'string' || typeof val === 'number') {
        const num = Number(val);
        return isNaN(num) ? undefined : num;
      }
      return undefined;
    },
    z.number().min(1, { message: 'Quantity must be a positive number' })
  ),
  note: z.string().min(1, { message: 'Note is required' }),
})

export const formFilterTransactionSchema = z.object({
  locationId: z.string().optional(),
  userId: z.string().optional(),
  rewardId: z.string().optional(),
  createdBy: z.string().optional(),
  status: z.string().optional(),
  expired: z.string().optional(),
})

export type TFormFilterTransaction = z.infer<typeof formFilterTransactionSchema>

export type TFormTransaction = z.infer<typeof formTransactionSchema>

export type TResponseTransaction = {
  id: string,
  cutPoint: number,
  note: string,
  expired: string,
  status: number,
  createdAt: string,
  rewardId: string,
  createdBy: string,
  date: string,
  createdByUser: TResponseUser,
  reward: TResponseReward,
  location: TResponseLocation,
  user: TResponseUser,
  qty: number,
  customerPoint: {
    id: string,
    userId: string,
    note: string,
    price: number | null,
    point: number,
    isExpired: number,
    type: number,
    isCancel: number
  }
}

