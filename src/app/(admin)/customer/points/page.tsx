

import PermissionContainer from '@/components/permission-container'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import TablePoint from './table'
import ButtonForm from './button-form'
import ButtonFormCustomPoint from './button-custom-form'

export default function page() {

  return (
    <PageContainer title='Customer Point' subtitle='List Of Customer Point' actions={
      <div className='flex gap-2'>
        <PermissionContainer permission='POST_point/custom'>
            <ButtonFormCustomPoint />
        </PermissionContainer>  
        <PermissionContainer permission='POST_point/add'>
            <ButtonForm />
        </PermissionContainer>
      </div>
    }>
      
      <TablePoint />
    </PageContainer>
  )
}
