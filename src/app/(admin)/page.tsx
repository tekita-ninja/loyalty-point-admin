import PageContainer from "./_components/containers/page-container";
import DashboardOverview from "./dashboard/dashboard-overview";

export default function Home() {
  return (
      <PageContainer title="DASHBOARD">
        <DashboardOverview />
      </PageContainer>
  )
}
