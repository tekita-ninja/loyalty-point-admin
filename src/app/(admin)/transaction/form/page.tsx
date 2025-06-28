import PageContainer from '@/app/(admin)/_components/containers/page-container'
import PermissionContainer from '@/components/permission-container'
import { FormTransaction } from '../form-transaction'


export default function page() {
    return (
        <PermissionContainer permission='POST_point/add'>
            <PageContainer title='Form Customer Point' subtitle='Form Add Customer Point'>
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <FormTransaction />
                </div>
            </PageContainer>
        </PermissionContainer>
    )
}
