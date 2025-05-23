"use client"

import { useCheckPermission } from '@/hooks/auth/useActionValidate'
import React from 'react'

export default function PermissionContainer(props: {
  children: React.ReactNode
  permission?: string
}) {
  const { data } = useCheckPermission(props.permission)
  return data && props.children
}
