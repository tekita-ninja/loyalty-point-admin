"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";

const getList = async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: `customer/all`
  })
  const data = response.data.data.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
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

export const useCustomer = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)


  const options = useQuery({
    queryKey: ["customer_options"],
    queryFn: () => getList(),
  });
  const get = useQuery({
    queryKey: ["customer", query],
    queryFn: () => getData(query),
  });

  return {
    options: {
      data: options.data,
      isLoading: options.isLoading,
      error: options.error,
    },
    lists: {
      data: get.data,
      isLoading: get.isLoading,
      error: get.error,
    },
    getDetail,
  };
}
