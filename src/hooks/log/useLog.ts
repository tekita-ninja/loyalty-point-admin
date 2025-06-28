"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";

const getData = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `transaction-log`,
    params
  })
  return response.data;
}

export const useLog = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)


  const get = useQuery({
    queryKey: ["transaction-log`,", query],
    queryFn: () => getData(query),
  });

  return {
    lists: {
      data: get.data,
      isLoading: get.isLoading,
      error: get.error,
    },
  };
}
