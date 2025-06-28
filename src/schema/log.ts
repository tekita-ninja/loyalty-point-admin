"use client"

import { TResponseUser } from "./user"
import { TCustomerPoint } from "./customer"
import { z } from "zod"

export const formFilterLogSchema = z.object({
  userId: z.string().optional(),
  createdBy: z.string().optional(),
  action: z.string().optional(),
  type: z.string().optional(),

})

export type TFormFilterLog = z.infer<typeof formFilterLogSchema>


export type TResponseLog = {
    id: string,
    oldPoints: number,
    newPoints: number,
    pointDifference: number,
    action: string,
    createdAt: string,
    updatedAt: string,
    createdBy: string,
    updatedBy: string,
    deletedAt: string,
    deletedBy: string,
    createdUser: TResponseUser,
    updatedUser: string,
    deletedUser: string,
    user: TResponseUser,
    customerPoint: TCustomerPoint
}

