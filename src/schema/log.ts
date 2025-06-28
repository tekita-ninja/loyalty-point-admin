"use client"

import { TResponseUser } from "./user"
import { TCustomerPoint } from "./customer"


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

