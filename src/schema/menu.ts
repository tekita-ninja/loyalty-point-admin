"use client"

import { z } from "zod"

export const formMenuSchema = z.object({
  title: z.string(),
  path: z.string().optional(),
  icon: z.string().optional(),
  order: z.coerce.number().optional(),
  parentId: z.string().optional(),
  isGroup: z.boolean().optional(),
})

export const formRoleMenuSchema = z.object({
  menuId: z.string(),
  roleIds: z.array(z.string()).optional(),
})
export type TRoleMenu = {
  menuId: string
  roleId: string
}
export type TFormMenu = z.infer<typeof formMenuSchema>
export type TFormRoleMenu = z.infer<typeof formRoleMenuSchema>
export type TResponseMenu = {
  id: string
  title: string
  icon?: string
  isGroup?: boolean
  order: number
  path?: string
  parentId?: string | null
  checked?:boolean
  parent?: {
    id: string
    title: string
  }
}
export type TResponseListMenu = {
  value: string
  label: string
  icon?: string
}
export interface MenuTreeNode extends TResponseMenu {
  checked?: boolean,
  children: MenuTreeNode[];
}
