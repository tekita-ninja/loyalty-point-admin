"use client"

import { z } from "zod"

export const formRoleSchema = z.object({
  name: z.string(),
  code: z.string()
})

export type TFormRole = z.infer<typeof formRoleSchema>

type TPermission = {
  id: string
  permission: {
    id: string
    name: string
    code: string
  }
}
export type TMenuRole = {
  menuId: string
  menu: {
    id: string
    title: string
    isGroup: boolean
    icon?: string | null
    path?: string | null
    parentId: string | null
    order: number
  }
}
export type TResponseRole = {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
  deletedAt?: string | null,
  menus: TMenuRole[] | []
  permissions: TPermission[] | []
}
