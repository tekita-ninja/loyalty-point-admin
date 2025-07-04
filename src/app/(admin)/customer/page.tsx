import { Suspense } from 'react'
import TableCustomer from './table'
import PageContainer from '@/app/(admin)/_components/containers/page-container'

export default function page() {
  return (
    <PageContainer title='Customer' subtitle='List Of Customer'>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableCustomer />
      </Suspense>
    </PageContainer>
  )
}
