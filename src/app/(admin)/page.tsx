import PageContainer from "./_components/containers/page-container";
import CardCounter from "./_fetures/dashboard/card-counter";
import ChartCustomer from "./_fetures/dashboard/chart-customer";
import ChartRevenue from "./_fetures/dashboard/chart-revenue";

export default function Home() {
  return (
    <PageContainer>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
        <CardCounter title="Users" data="5" icon="majesticons:users-line" />
        <CardCounter title="Outlet" movementIndocator="UP" movementCount={1} data="100" icon="material-symbols:store-rounded" />
        <CardCounter title="Customers" data="500k" movementCount={10} movementIndocator="UP" icon="fa-solid:users" />
        <CardCounter title="Total Revenue" data="Rp 500b" movementCount={1.4} movementIndocator="DOWN" icon="streamline:dollar-coin-solid" />
      </div>
      <div className="grid lg:grid-cols-2 gap-3 md:gap-4 mb-3">
        <ChartRevenue />
        <ChartCustomer />
      </div>
    </PageContainer>
  )
}
