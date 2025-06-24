
import PermissionContainer from '@/components/permission-container'
import PageContainer from '../../_components/containers/page-container'
import TableBenefit from './table'
import { FormBenefit } from './form'

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
