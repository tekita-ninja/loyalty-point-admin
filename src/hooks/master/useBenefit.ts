"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormBenefit } from "@/schema/master/benefit";

const getList = async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: `benefit/all`
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
    url: `benefit`,
    params
  })
  return response.data;
}
const getDetail = async (id: string) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `benefit/${id}`
  })
  return response.data;
}
const createData = async (payload: TFormBenefit) => {
  const response = await axiosInstance.post("benefit", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create data"
    })
  }
  return response.data;
};

const updateData = async ({ id, ...payload }: TFormBenefit & { id: string }) => {
  const response = await axiosInstance.put(`benefit/${id}`, payload);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success update data"
    })
  }
  return response.data;
};

const deleteData = async (id: string) => {
  const response = await axiosInstance.delete(`benefit/${id}`);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success delete data"
    })
  }
  return response.data;
};

export const useBenefit = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const options = useQuery({
    queryKey: ["benefit_options"],
    queryFn: () => getList(),
  });
  const get = useQuery({
    queryKey: ["benefit", query],
    queryFn: () => getData(query),
  });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["benefit"] });
    },
  });
  const update = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["benefit"] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["benefit"] });
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
