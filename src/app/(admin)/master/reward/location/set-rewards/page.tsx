import PageContainer from '@/app/(admin)/_components/containers/page-container';
import SetRewardContent from './content';
interface PageProps {
  searchParams: { locationId: string };
}
export default function page(props:PageProps) {
  return (
    <PageContainer title="Set Rewards to Location">
      <SetRewardContent locationId={props.searchParams.locationId} />
    </PageContainer>
  )
}
