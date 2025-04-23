"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";

const getData = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `balance-wallet`,
    params
  })
  return response.data
}

export const useWallet = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  return useQuery({
    queryKey: ['asset-list',query],
    queryFn: () => getData(query),
  });
}
