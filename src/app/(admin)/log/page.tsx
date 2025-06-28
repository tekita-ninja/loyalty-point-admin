

import PageContainer from '@/app/(admin)/_components/containers/page-container'
import TableLog from './table'

export default function page() {
  return (
    <PageContainer title='Log' subtitle='List Of Log Points'>
      <TableLog />
    </PageContainer>
  )
}
