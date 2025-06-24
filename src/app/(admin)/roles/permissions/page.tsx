import React from 'react'
import { FormAction } from './form'
import PageContainer from '../../_components/containers/page-container'
import Table from './table'
import PermissionContainer from '@/components/permission-container'
import { SyncButton } from './sync-button'

export default function page() {
  return (
    <PageContainer title='Permission' subtitle='List Of Permission' actions={
      <div>
        <PermissionContainer permission='POST_permissions'>
          <FormAction />
        </PermissionContainer>
      </div>
    }>
      <Table />
    </PageContainer>
  )
}