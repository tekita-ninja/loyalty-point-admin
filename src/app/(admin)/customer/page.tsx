import TableBenefit from './table'
import PageContainer from '@/app/(admin)/_components/containers/page-container'

export default function page() {
  return (
    <PageContainer title='Customer' subtitle='List Of Customer'>
      <TableBenefit />
    </PageContainer>
  )
}
