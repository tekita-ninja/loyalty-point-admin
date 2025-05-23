import React from 'react'
import PageContainer from '../_components/containers/page-container'
import Table from './table'
import { FormAction } from './form'
import PermissionContainer from '@/components/permission-container'

export default function page() {
  return (
    <PageContainer title='Role' subtitle='List Of Role' actions={
      <div>
        <PermissionContainer permission='POST_roles'>
          <FormAction />
        </PermissionContainer>
      </div>
    }>
      <Table />
    </PageContainer>
  )
}
