
import PermissionContainer from '@/components/permission-container'
import TableBenefit from './table'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import { FormCategory } from './form'
import TableCategory from './table'

export default function page() {
  return (
    <PageContainer title='Category' subtitle='List Of Category' actions={
      <div>
        <PermissionContainer permission='POST_category'>
          <FormCategory />
        </PermissionContainer>
      </div>
    }>
      <TableCategory />
    </PageContainer>
  )
}
