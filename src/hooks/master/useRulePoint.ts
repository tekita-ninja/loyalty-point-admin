"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormRulePoint } from "@/schema/master/rule-point";

const getList = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `rule-point`,
    params: {
      ...params,
      date:  new Date().toISOString()
    }
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
    url: `rule-point`,
    params
  })
  return response.data;
}
const getDetail = async (id: string) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `rule-point/${id}`
  })
  return response.data;
}
const createData = async (payload: TFormRulePoint) => {
  const response = await axiosInstance.post("rule-point", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create data"
    })
  }
  return response.data;
};

const updateData = async ({ id, ...payload }: TFormRulePoint & { id: string }) => {
  const response = await axiosInstance.put(`rule-point/${id}`, payload);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success update data"
    })
  }
  return response.data;
};

const deleteData = async (id: string) => {
  const response = await axiosInstance.delete(`rule-point/${id}`);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success delete data"
    })
  }
  return response.data;
};

export const useRulePoint = (optionsParams?: TQueryParam) => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const options = useQuery({
    queryKey: ["rule-point_options", optionsParams],
    queryFn: () => getList(optionsParams),
  });
  
  const get = useQuery({
    queryKey: ["rule-point", query],
    queryFn: () => getData(query),
  });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rule-point"] });
    },
  });
  const update = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rule-point"] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rule-point"] });
    },
  });


  return {
    options: {
      data: options.data,
      isLoading: options.isLoading,
      error: options.error,
    },
    rulePointOptions: {
      data: options.data,
      isLoading: options.isLoading,
      error: options.error,
    },
    lists: {
      data: get.data,
      isLoading: get.isLoading,
      error: get.error,
    },
    create,
    update,
    remove,
    getDetail,
  };
}
