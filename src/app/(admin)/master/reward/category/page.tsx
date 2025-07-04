
import PermissionContainer from '@/components/permission-container'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import { FormCategory } from './form'
import TableCategory from './table'
import { Suspense } from 'react'

export default function page() {
  return (
    <PageContainer title='Category' subtitle='List Of Category' actions={
      <div>
        <PermissionContainer permission='POST_category'>
          <FormCategory />
        </PermissionContainer>
      </div>
    }>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableCategory />
      </Suspense>
    </PageContainer>
  )
}
