import DashboardOverview from "./dashboard/dashboard-overview";

import PageContainer from "./_components/containers/page-container";

export default function Home() {
  return (
      <PageContainer title="DASHBOARD">
         <DashboardOverview />
         <div>test</div>
       </PageContainer>
  )
}
