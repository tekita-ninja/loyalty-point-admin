
import PermissionContainer from '@/components/permission-container'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import { FormLocation } from './form'
import TableLocation from './table'
import { Suspense } from 'react'

export default function page() {
  return (
    <PageContainer title='Locations' subtitle='List Of Locations' actions={
      <div>
        <PermissionContainer permission='POST_location'>
          <FormLocation />
        </PermissionContainer>
      </div>
    }>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableLocation />
      </Suspense>
    </PageContainer>
  )
}
