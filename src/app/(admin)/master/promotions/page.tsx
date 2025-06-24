
import PermissionContainer from '@/components/permission-container'
import PageContainer from '../../_components/containers/page-container'
import { FormPromotions } from './form'
import TablePromotions from './table'

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
