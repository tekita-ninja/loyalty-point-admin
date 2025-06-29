"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormTransaction } from "@/schema/transaction";

const getData = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `transaction`,
    params
  })
  return response.data;
}
const createData = async (payload: TFormTransaction) => {
  const response = await axiosInstance.post("transaction", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create transaction!"
    })
  }
  return response.data;
};


export const useTransaction = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const get = useQuery({
    queryKey: ["transaction", query],
    queryFn: () => getData(query),
  });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", 'dashboard_notification'] });
    },
  });


  return {
    lists: {
      data: get.data,
      isLoading: get.isLoading,
      error: get.error,
    },
    create
  };
}
