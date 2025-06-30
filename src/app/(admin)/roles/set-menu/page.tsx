'use client'

import { Suspense } from 'react'
import SetRoleMenu from './set-role-menu'

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetRoleMenu />
    </Suspense>
  )
}
