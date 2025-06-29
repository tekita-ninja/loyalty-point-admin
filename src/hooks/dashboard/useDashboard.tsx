"use client";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";


const getOverview = async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: 'dashboard/get-overview'
  })
  return {
    ...response.data.data,
    topRewardsName: response.data.data.topRewards?.map((item: any) => item.name),
    topRewardsLikes: response.data.data.topRewards?.map((item: any) => item.totalLikes),
  };
}

const getNotification = async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: 'dashboard/get-notification'
  })
  return response.data.data;
}


export const useDashboard = () => {

  const getOverviewData = useQuery({
    queryKey: ['dashboard_overview'],
    queryFn: () => getOverview(),
    enabled: true,
  })

  const getNotificationData = useQuery({
    queryKey: ['dashboard_notification'],
    queryFn: () => getNotification(),
    enabled: true,
  })


  return {
    overview: {
        data: getOverviewData.data,
        isLoading: getOverviewData.isLoading,
        error: getOverviewData.error,
    },
    notification: {
        data: getNotificationData.data,
        isLoading: getNotificationData.isLoading,
        error: getNotificationData.error,
    }
  };
}
