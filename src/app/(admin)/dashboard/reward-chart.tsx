'use client';
import { TResponseDashboardOverview } from "@/schema/dashboard";
import Chart from "react-apexcharts";

export default function RewardChart({ data }: { data: TResponseDashboardOverview }) {
    console.log('RewardChart data', data);
    const options = {
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: data?.topRewardsName || [],
        }
    }
    const series = [
        {
            name: "Total Likes",
            data: data?.topRewardsLikes || []
        }
    ]

    return (
        <Chart options={options} series={series} type="bar" height={350} />
        <div>test</div>
    )
}