"use client"

import { z } from "zod"
import { TResponseUser } from "./user"
import { TResponseReward } from "./master/reward"
import { TResponseLocation } from "./master/location"

export const formTransactionSchema = z.object({
    userId: z.string().min(1, { message: 'Customer is required' }),
    locationId: z.string().min(1, { message: 'Location is required' }),
    rewardId: z.string().min(1, { message: 'Reward is required' }),
    note: z.string().min(1, { message: 'Note is required' }),
})

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

