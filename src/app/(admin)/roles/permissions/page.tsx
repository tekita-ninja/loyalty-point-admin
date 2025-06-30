import React, { Suspense } from 'react'
import { FormAction } from './form'
import PageContainer from '../../_components/containers/page-container'
import Table from './table'
import PermissionContainer from '@/components/permission-container'

export default function page() {
  return (
    <PageContainer title='Permission' subtitle='List Of Permission' actions={
      <div>
        <PermissionContainer permission='POST_permissions'>
          <FormAction />
        </PermissionContainer>
      </div>
    }>
      <Suspense fallback={<div>Loading table...</div>}>
        <Table />
      </Suspense>
    </PageContainer>
  )
}