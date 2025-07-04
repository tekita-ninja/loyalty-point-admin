
import PermissionContainer from '@/components/permission-container'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import { FormReward } from './form'
import TableReward from './table'
import { Suspense } from 'react'

export default function page() {
  return (
    <PageContainer title='Reward' subtitle='List Of Reward' actions={
      <div>
        <PermissionContainer permission='POST_reward'>
          <FormReward />
        </PermissionContainer>
      </div>
    }>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableReward />
      </Suspense>
    </PageContainer>
  )
}
