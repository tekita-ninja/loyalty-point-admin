'use client';
import { TResponseDashboardOverview } from "@/schema/dashboard";
import Chart from "react-apexcharts";

export default function RewardChart({ data }: { data: TResponseDashboardOverview }) {

    const options = {
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false, // 🚫 menonaktifkan seluruh toolbar
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
    )
}