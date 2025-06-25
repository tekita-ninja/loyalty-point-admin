import PageContainer from '@/app/(admin)/_components/containers/page-container';
import SetBenefitContent from './content';
interface PageProps {
  searchParams: { rankingId: string };
}
export default function page(props:PageProps) {
  return (
    <PageContainer title="Set Benefits to Ranking">
      <SetBenefitContent rankingId={props.searchParams.rankingId} />
    </PageContainer>
  )
}
