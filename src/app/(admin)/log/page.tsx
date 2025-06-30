

import PageContainer from '@/app/(admin)/_components/containers/page-container'
import TableLog from './table'
import { Suspense } from 'react'

export default function page() {
  return (
    <PageContainer title='Log' subtitle='List Of Log Points'>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableLog />
      </Suspense>
    </PageContainer>
  )
}
