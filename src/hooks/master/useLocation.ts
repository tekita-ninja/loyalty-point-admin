"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormLocation } from "@/schema/master/location";

const getList = async (params?: TQueryParam) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `location`,
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
    url: `location`,
    params
  })
  return response.data;
}
const getDetail = async (id: string) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `location/${id}`
  })
  return response.data;
}
const createData = async (payload: TFormLocation) => {
  const response = await axiosInstance.post("location", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create data"
    })
  }
  return response.data;
};

const updateData = async ({ id, ...payload }: TFormLocation & { id: string }) => {
  const response = await axiosInstance.put(`location/${id}`, payload);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success update data"
    })
  }
  return response.data;
};

const deleteData = async (id: string) => {
  const response = await axiosInstance.delete(`location/${id}`);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success delete data"
    })
  }
  return response.data;
};

export const useLocation = (optionsParams? : TQueryParam) => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString);
  const queryClient = useQueryClient();


  const options = useQuery({
    queryKey: ["location_options", optionsParams],
    queryFn: () => getList(optionsParams),
  });

  const get = useQuery({
    queryKey: ["location", query],
    queryFn: () => getData(query),
  });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location"] });
    },
  });
  const update = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location"] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location"] });
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
    locationOptions: {
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
