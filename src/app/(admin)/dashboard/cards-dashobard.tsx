import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { TResponseDashboardOverview } from "@/schema/dashboard"
import { Users } from "lucide-react"
import { useRouter } from "next/navigation"

export const UserCards = ({ data } : { data: TResponseDashboardOverview }) => {
    const router = useRouter()
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-lg">Users</CardTitle>
                <div className="text-md text-muted-foreground flex gap-2 items-center">
                   <Users /> {data?.amountUser || 0}
                </div>
                <div className="grid gap-2">
                    <p className="text-sm text-muted-foreground">Manage your users here.</p>
                    <Button onClick={() => router.push('/roles/users')} variant="outline" className="w-full">View Users</Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export const CustomerCards = ({ data } : { data: TResponseDashboardOverview }) => {
    const router = useRouter()
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-lg">Customers</CardTitle>
                <div className="text-md text-muted-foreground mb-2 flex gap-2 items-center">
                    <Users /> {data?.amountCustomer || 0}
                </div>
                <div className="grid gap-2">
                    <p className="text-sm text-muted-foreground">Manage your customers here.</p>
                    <Button onClick={() => router.push('/customer')} variant="outline" className="w-full">View Customers</Button>
                </div>
            </CardHeader>

        </Card>
    )
}