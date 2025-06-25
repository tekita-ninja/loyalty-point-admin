"use client";

import axiosInstance from "@/lib/axios";
import { TResponseLocation } from "@/schema/master/location";
import { TFormLocationRewards } from "@/schema/master/location-rewards";
import { TResponseReward } from "@/schema/master/reward";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export type CheckRewardItem = TResponseReward & {
    checked?: boolean;
}
export type LocationReward = {
  locationId: string;
  rewards: {
    reward: TResponseReward
  }[];
}
export type GroupedRankings = Record<string, CheckRewardItem[]>;

const getLocationRewards = async (locationId: string): Promise<CheckRewardItem[]> => {
  const response = await axiosInstance({
    method: 'GET',
    url: `reward/all`
  })
  const locationResponse = await axiosInstance.get(`location/${locationId}`);
  const locations = response.data.data;
  const currentRewards = locationResponse.data.data.rewards;
  const currentRewardIds = currentRewards.map((i: any) => i.reward.id)
  const ownLocationRewards = locations.map((item: TResponseLocation) => {
    return {
      ...item,
      checked: currentRewardIds.includes(item.id)
    }
  })
  return ownLocationRewards;
}

const createData = async (payload: TFormLocationRewards) => {
  const response = await axiosInstance.post("location/assign-reward", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success sign rewards"
    })
  }
  return response.data;
};


export const useLocationRewards = (locationId: string) => {
  const queryClient = useQueryClient();
  const queryData = useQuery({
    queryKey: ["location_rewards"],
    queryFn: () => getLocationRewards(locationId),
  });
  const signLocationRewards = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location_rewards"] });
    },
  });
  return {
    ...queryData,
    signLocationRewards,

  };
}
