
import PermissionContainer from '@/components/permission-container'
import { FormRulePoint } from './form'
import TableRulePoint from './table'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import { Suspense } from 'react'

export default function page() {
  return (
    <PageContainer title='Rule Point' subtitle='List Of Rule Point' actions={
      <div>
        <PermissionContainer permission='POST_rule-point'>
          <FormRulePoint />
        </PermissionContainer>
      </div>
    }>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableRulePoint />
      </Suspense>
    </PageContainer>
  )
}
