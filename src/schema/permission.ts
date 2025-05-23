"use client"

import { z } from "zod"

export const formPermissionSchema = z.object({
  name: z.string(),
  code: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  path: z.string(),
})

export type TFormPermission = z.infer<typeof formPermissionSchema>

export type TResponsePermission = {
  id: string
  name: string
  code: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}
