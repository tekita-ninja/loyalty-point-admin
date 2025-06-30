import React, { Suspense } from 'react'
import PageContainer from '../_components/containers/page-container'
import { FormMenu } from './form'
import TableMenu from './table'
import PermissionContainer from '@/components/permission-container'

export default function page() {
  return (
    <PageContainer title='Menu' subtitle='List Of Menu' actions={
      <div>
        <PermissionContainer permission='POST_menus'>
          <FormMenu />
        </PermissionContainer>
      </div>
    }>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableMenu />
      </Suspense>
    </PageContainer>
  )
}
