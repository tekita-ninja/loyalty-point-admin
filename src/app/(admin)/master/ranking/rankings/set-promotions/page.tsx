import PageContainer from '@/app/(admin)/_components/containers/page-container';
import SetPromotionsContent from './content';
interface PageProps {
  searchParams: { rankingId: string };
}
export default function page(props:PageProps) {
  return (
    <PageContainer title="Set Promotions to Ranking">
      <SetPromotionsContent rankingId={props.searchParams.rankingId} />
    </PageContainer>
  )
}
