"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormUser, TFormUserRole } from "@/schema/user";

const getList = async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: `users/all`
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
    url: `users`,
    params
  })
  return response.data;
}
const getDetail = async (id: string) => {
  const response = await axiosInstance({
    method: 'GET',
    url: `users/${id}`
  })
  return response.data;
}
const createData = async (payload: TFormUser) => {
  const response = await axiosInstance.post("users", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create data"
    })
  }
  return response.data;
};

const updateData = async ({ id, ...payload }: TFormUser & { id: string }) => {
  const response = await axiosInstance.patch(`users/${id}`, payload);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success update data"
    })
  }
  return response.data;
};

const deleteData = async (id: string) => {
  const response = await axiosInstance.delete(`users/${id}`);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success delete data"
    })
  }
  return response.data;
};

// Extra
const setUserRole = async (payload: TFormUserRole) => {
  const response = await axiosInstance.post("users/set-role", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success set data"
    })
  }
  return response.data;
};

export const useUser = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const queryUserAlls = useQuery({
    queryKey: ["users_all"],
    queryFn: () => getList(),
    enabled: false
  });
  const queryUsers = useQuery({
    queryKey: ["users", query],
    queryFn: () => getData(query),
  });

    const setRole = useMutation({
      mutationFn: setUserRole,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const update = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    options: {
      data: queryUserAlls.data,
      isLoading: queryUserAlls.isLoading,
      error: queryUserAlls.error,
    },
    lists: {
      data: queryUsers.data,
      isLoading: queryUsers.isLoading,
      error: queryUsers.error,
    },
    create,
    update,
    remove,
    setRole,
    getDetail
  };
}
