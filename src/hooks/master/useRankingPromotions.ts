"use client";

import axiosInstance from "@/lib/axios";
import { TResponsePromotions } from "@/schema/master/promotions";
import { TResponseRanking } from "@/schema/master/ranking";
import { TFormRankingPromotions } from "@/schema/master/ranking-promotions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export type CheckPromotionItem = TResponsePromotions & {
    checked?: boolean;
}
export type RankingPromotions = {
  rankingId: string;
  promotions: {
    promotions: {
        id: string,
        title: string,
        subtitle: string,
        description: string,
        startDate: string,
        endDate: string,
        isPush: number
    }
  }[];
}
export type GroupedRankings = Record<string, CheckPromotionItem[]>;

const getRankingPromotions = async (rankingId: string): Promise<CheckPromotionItem[]> => {
  const response = await axiosInstance({
    method: 'GET',
    url: `promotion/all`
  })
  const rankingResponse = await axiosInstance.get(`ranking/${rankingId}`);
  const rankings = response.data.data;
  const currentPromotions = rankingResponse.data.data.promotions;
  const currentPromotionIds = currentPromotions.map((i: any) => i.promotion.id)
  const ownRankingPromotions = rankings.map((item: TResponseRanking) => {
    return {
      ...item,
      checked: currentPromotionIds.includes(item.id)
    }
  })
  return ownRankingPromotions;
}

const createData = async (payload: TFormRankingPromotions) => {
  const response = await axiosInstance.post("ranking/assign-promotion", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success sign promotions"
    })
  }
  return response.data;
};


export const useRankingPromotions = (rankingId: string) => {
  const queryClient = useQueryClient();
  const queryData = useQuery({
    queryKey: ["ranking_promotions"],
    queryFn: () => getRankingPromotions(rankingId),
  });
  const signRankingPromotions = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ranking_promotions"] });
    },
  });
  return {
    ...queryData,
    signRankingPromotions,

  };
}
