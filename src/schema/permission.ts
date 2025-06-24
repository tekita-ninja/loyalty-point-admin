"use client"

import { z } from "zod"

export const formPermissionSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  code: z.string().min(1, { message: 'Code is required' }),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  path: z.string().min(1, { message: 'Path is required' }),
})

export type TFormPermission = z.infer<typeof formPermissionSchema>

export type TResponsePermission = {
  id: string
  name: string
  code: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}
