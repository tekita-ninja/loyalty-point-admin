"use client";

import axiosInstance from "@/lib/axios";
import { TResponseBenefit } from "@/schema/master/benefit";
import { TResponseRanking } from "@/schema/master/ranking";
import { TFormRankingBenefits } from "@/schema/master/ranking-benefits";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export type CheckBeneftiItem = TResponseBenefit & {
    checked?: boolean;
}
export type RankingBenefits = {
  rankingId: string;
  benefits: {
    benefit: TResponseBenefit
  }[];
}
export type GroupedRankings = Record<string, CheckBeneftiItem[]>;

const getRankingBenefits = async (rankingId: string): Promise<CheckBeneftiItem[]> => {
  const response = await axiosInstance({
    method: 'GET',
    url: `benefit/all`
  })
  const rankingResponse = await axiosInstance.get(`ranking/${rankingId}`);
  const rankings = response.data.data;
  const currentBenefits = rankingResponse.data.data.benefits;
  const currentBenefitIds = currentBenefits.map((i: any) => i.benefit.id)
  const ownRankingBenefits = rankings.map((item: TResponseRanking) => {
    return {
      ...item,
      checked: currentBenefitIds.includes(item.id)
    }
  })
  return ownRankingBenefits;
}

const createData = async (payload: TFormRankingBenefits) => {
  const response = await axiosInstance.post("ranking/assign-benefit", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success sign benefit"
    })
  }
  return response.data;
};


export const useRankingBenefit = (rankingId: string) => {
  const queryClient = useQueryClient();
  const queryData = useQuery({
    queryKey: ["ranking_benefits"],
    queryFn: () => getRankingBenefits(rankingId),
  });
  const signRankingBenefits = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ranking_benefits"] });
    },
  });
  return {
    ...queryData,
    signRankingBenefits,

  };
}
