import PermissionContainer from '@/components/permission-container'
import PageContainer from '@/app/(admin)/_components/containers/page-container'
import { FormCustomPoint } from '../form-custom'


export default function page() {
    return (
        <PermissionContainer permission='POST_point/custom'>
            <PageContainer title='Form Customer Point' subtitle='Form Custom Customer Point'>
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <FormCustomPoint />
                </div>

            </PageContainer>
        </PermissionContainer>
    )
}
