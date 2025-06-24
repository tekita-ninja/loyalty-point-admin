"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormPromotions } from "@/schema/master/promotions";

const getList = async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: `promotion/all`
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
    url: `promotion`,
    params
  })
  return response.data;
}
const getDetail = async (id: string) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `promotion/${id}`
  })
  return response.data;
}
const createData = async (payload: TFormPromotions) => {
  const response = await axiosInstance.post("promotion", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create data"
    })
  }
  return response.data;
};

const updateData = async ({ id, ...payload }: TFormPromotions & { id: string }) => {
  const response = await axiosInstance.put(`promotion/${id}`, payload);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success update data"
    })
  }
  return response.data;
};

const deleteData = async (id: string) => {
  const response = await axiosInstance.delete(`promotion/${id}`);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success delete data"
    })
  }
  return response.data;
};

export const usePromotions = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const options = useQuery({
    queryKey: ["promotiosn_options"],
    queryFn: () => getList(),
  });
  const get = useQuery({
    queryKey: ["promotions", query],
    queryFn: () => getData(query),
  });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
    },
  });
  const update = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
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
    create,
    update,
    remove,
    getDetail,
  };
}
