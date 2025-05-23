"use client"

import { z } from "zod"

export const formUserSchema = z.object({
  fullname: z.string(),
  email: z.string()
})

export const formUserRoleSchema = z.object({
  userId: z.string(),
  roleIds: z.array(z.string()).optional(),
})

export type TFormUser = z.infer<typeof formUserSchema>
export type TFormUserRole = z.infer<typeof formUserRoleSchema>
type TRole = {
  id: string
  role: {
    id: string
    name: string
    code: string
  }
}
export type TResponseUser = {
  id: string
  fullname: string
  email: string
  status: boolean
  roles: TRole[] | []
}
