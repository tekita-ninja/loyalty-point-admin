"use client"

import { z } from "zod"

export const formUserSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),
  birthDate: z.string().min(1, { message: "Birth date is required" }),
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
  gender: 'MALE' | 'FEMALE',
  birthDate: string,
  status: boolean
  roles: TRole[] | []
}
