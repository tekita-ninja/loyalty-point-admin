"use client"

import { z } from "zod"
import { TResponseUser } from "./user"
import { TResponseRulePoint } from "./master/rule-point"
import { TResponseReward } from "./master/reward"
import { TResponseLocation } from "./master/location"

export const formAddCustomerPointSchema = z.object({
    userId: z.string().min(1, { message: 'Customer is required' }),
    price: z.union([z.string(), z.number()]).refine(val => {
        const num = typeof val === 'string' ? parseFloat(val) : val;
        return !isNaN(num) && num >= 0;
    }, {
        message: 'Price must be greater than or equal to 0',
    }),
    note: z.string().min(1, { message: 'Note is required' }),
    rulePointId: z.string().min(1, { message: 'Rule Point is required' }),
})

export const formCustomCustomerPointSchema = z.object({
    userId: z.string().min(1, { message: 'Customer is required' }),
    point: z.union([z.string(), z.number()]),
    note: z.string().min(1, { message: 'Note is required' }),
})

export const formFilterCustomerPointSchema = z.object({
    isCancel: z.string().optional(),
    type: z.string().optional(),
    userId: z.string().optional(),
    rulePointId: z.string().optional(),
    createdBy: z.string().optional(),
})

export type TFormCustomCustomerPoint = z.infer<typeof formCustomCustomerPointSchema>

export type TFormAddCustomerPoint = z.infer<typeof formAddCustomerPointSchema>

export type TFormFilterCustomerPoint= z.infer<typeof formFilterCustomerPointSchema>

export type TResponseCustomerPoint = {
    id: string,
    rulePointId?: string,
    note: string,
    price?: number,
    point: number,
    type: number,
    isCancel: number,
    isExpired: number,
    createdAt: string,
    createdBy: string,
    user: TResponseUser,
    rulePoint: TResponseRulePoint,
    transaction?: {
        id: string,
        cutPoint: number,
        note: string,
        reward: TResponseReward,
        location: TResponseLocation 
    },
    createdByUser: TResponseUser
}

