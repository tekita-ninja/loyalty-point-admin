
import PermissionContainer from '@/components/permission-container'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import { FormReward } from './form'
import TableReward from './table'

export default function page() {
  return (
    <PageContainer title='Reward' subtitle='List Of Reward' actions={
      <div>
        <PermissionContainer permission='POST_reward'>
          <FormReward />
        </PermissionContainer>
      </div>
    }>
      <TableReward />
    </PageContainer>
  )
}
