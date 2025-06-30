

import PermissionContainer from '@/components/permission-container'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import TableTransaction from './table'
import ButtonForm from './button-form'
import { Suspense } from 'react'

export default function page() {
  return (
    <PageContainer title='Transaction' subtitle='List Of Transaction' actions={
      <div className='flex gap-2'>
        <PermissionContainer permission='POST_transaction'>
            <ButtonForm />
        </PermissionContainer>
      </div>
    }>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableTransaction />
      </Suspense>
    </PageContainer>
  )
}
