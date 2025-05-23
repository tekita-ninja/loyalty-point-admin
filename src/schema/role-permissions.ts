"use client"

import { z } from "zod"

export const formRolePermissionSchema = z.object({
  roleId: z.string(),
  permissionIds: z.array(z.string()).optional(),
})

export type TFormRolePermission = z.infer<typeof formRolePermissionSchema>
