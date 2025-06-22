"use client"

import { z } from "zod"

export const formUserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.string(),
  birthDate: z.string()
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
  firstname: string
  lastname: string
  email: string,
  phone: string,
  gender: string,
  birthDate: string,
  status: boolean
  roles: TRole[] | []
}
