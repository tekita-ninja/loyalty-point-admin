import PageContainer from '../../_components/containers/page-container'
import FormTemplate from './form'
import Table from './table'

export default function TemplateTablePage() {
  return (
    <PageContainer title='Wallets' subtitle='List Of Wallet' actions={
      <div className='flex gap-2 items-center'>
        <FormTemplate />
      </div>
    }>
      <Table />
    </PageContainer>
  )
}
