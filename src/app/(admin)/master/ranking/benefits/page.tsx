
import PermissionContainer from '@/components/permission-container'
import TableBenefit from './table'
import { FormBenefit } from './form'
import PageContainer from '@/app/(admin)/_components/containers/page-container'

export default function page() {
  return (
    <PageContainer title='Benefits' subtitle='List Of Benefits' actions={
      <div>
        <PermissionContainer permission='POST_benefit'>
          <FormBenefit />
        </PermissionContainer>
      </div>
    }>
      <TableBenefit />
    </PageContainer>
  )
}
