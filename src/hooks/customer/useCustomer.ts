"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";

const getList = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `customer`,
    params
  })
  const data = response.data.data.map((item: any) => {
    return {
      value: item.id,
      label: `${item.firstname} ${item.lastname}`,
    }
  })
  return data;
}
const getData = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `customer`,
    params
  })
  return response.data;
}
const getDetail = async (id: string) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `customer/${id}`
  })
  return response.data;
}

export const useCustomer = (optionsParams? : TQueryParam) => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)


  const customerOptions = useQuery({
    queryKey: ["customer_options", , optionsParams],
    queryFn: () => getList(optionsParams),
  });

  const get = useQuery({
    queryKey: ["customer", query],
    queryFn: () => getData(query),
  });

  return {
    customerOptions: {
      data: customerOptions.data,
      isLoading: customerOptions.isLoading,
      error: customerOptions.error,
    },
    lists: {
      data: get.data,
      isLoading: get.isLoading,
      error: get.error,
    },
    getDetail,
  };
}
