'use client'

import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { CustomerCards, UserCards } from "./cards-dashobard";
import RewardChart from "./reward-chart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardOverview() {
    const { overview } = useDashboard()
    const router = useRouter()

    return (
        <div className="grid gap-5">
            <div className="flex gap-4">
                <UserCards data={overview.data} />
                <CustomerCards data={overview.data} />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-700">Top 5 Rewards</h2>
                <Button onClick={() => router.push('/master/reward/rewards?topLikes=1')} variant="outline" className="mt-2 mb-4" >
                    View All Rewards
                </Button>
                <RewardChart data={overview.data} />
            </div>
        </div>
    )
}