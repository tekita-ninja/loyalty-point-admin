
import PermissionContainer from '@/components/permission-container'
import { FormPromotions } from './form'
import TablePromotions from './table'
import PageContainer from '@/app/(admin)/_components/containers/page-container'

export default function page() {
  return (
    <PageContainer title='Promotions' subtitle='List Of Promotions' actions={
      <div>
        <PermissionContainer permission='POST_promotion'>
          <FormPromotions />
        </PermissionContainer>
      </div>
    }>
      <TablePromotions />
    </PageContainer>
  )
}
