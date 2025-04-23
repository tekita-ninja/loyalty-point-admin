import SuspenceLoader from '@/components/suspence-loader';
import { Suspense } from 'react';
import PageContainer from '../../_components/containers/page-container';
import FormTemplate from './form';
import Table from './table';
export default function TemplateTablePage() {
  return (
    <PageContainer title='Wallets' subtitle='List Of Wallet' actions={
      <div className='flex gap-2 items-center'>
        <FormTemplate />
      </div>
    }>
      <Suspense fallback={<SuspenceLoader />}>
        <Table />
      </Suspense>
    </PageContainer>
  )
}
