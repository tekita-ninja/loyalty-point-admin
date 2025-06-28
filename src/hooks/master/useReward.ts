"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormReward } from "@/schema/master/reward";

const getList = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `reward`,
    params
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
    url: `reward`,
    params
  })
  return response.data;
}
const getDetail = async (id: string) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `reward/${id}`
  })
  return response.data;
}
const createData = async (payload: TFormReward) => {
  const response = await axiosInstance.post("reward", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create data"
    })
  }
  return response.data;
};

const updateData = async ({ id, ...payload }: TFormReward & { id: string }) => {
  const response = await axiosInstance.put(`reward/${id}`, payload);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success update data"
    })
  }
  return response.data;
};

const deleteData = async (id: string) => {
  const response = await axiosInstance.delete(`reward/${id}`);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success delete data"
    })
  }
  return response.data;
};

export const useReward = (optionsParams? : TQueryParam) => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const options = useQuery({
    queryKey: ["reward_options", optionsParams],
    queryFn: () => getList(optionsParams),
  });
  
  const get = useQuery({
    queryKey: ["reward", query],
    queryFn: () => getData(query),
  });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reward"] });
    },
  });
  const update = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reward"] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reward"] });
    },
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
    rewardOptions: {
      data: options.data,
      isLoading: options.isLoading,
      error: options.error,
    }, 
    create,
    update,
    remove,
    getDetail,
  };
}
