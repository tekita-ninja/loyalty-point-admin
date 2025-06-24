
import PermissionContainer from '@/components/permission-container'
import { FormRanking } from './form'
import TableRanking from './table'
import PageContainer from '@/app/(admin)/_components/containers/page-container'

export default function page() {
  return (
    <PageContainer title='Ranking' subtitle='List Of Ranking' actions={
      <div>
        <PermissionContainer permission='POST_ranking'>
            <FormRanking />
        </PermissionContainer>
      </div>
    }>
      <TableRanking />
    </PageContainer>
  )
}
