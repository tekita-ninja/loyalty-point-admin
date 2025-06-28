"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormAddCustomerPoint, TFormCustomCustomerPoint } from "@/schema/customer-poin";

const getData = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `point`,
    params
  })
  return response.data;
}
const addData = async (payload: TFormAddCustomerPoint) => {
  const response = await axiosInstance.post("point/add", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success add point"
    })
  }
  return response.data;
};
const cancelData = async (customerPointId: string) => {
  const response = await axiosInstance.post(`point/cancel/${customerPointId}`);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success cancel point"
    })
  }
  return response.data;
};

const customData = async (payload: TFormCustomCustomerPoint) => {
  const response = await axiosInstance.post("point/custom", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success add custom point"
    })
  }
  return response.data;
};

export const useCustomerPoints = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const get = useQuery({
    queryKey: ["customer_point", query],
    queryFn: () => getData(query),
  });

  const add = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer_point"] });
    },
  });
  const custom = useMutation({
    mutationFn: customData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer_point"] });
    },
  });
  const cancel = useMutation({
    mutationFn: cancelData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer_point"] });
    },
  });


  return {
    lists: {
      data: get.data,
      isLoading: get.isLoading,
      error: get.error,
    },
    add,
    custom,
    cancel,
  };
}
