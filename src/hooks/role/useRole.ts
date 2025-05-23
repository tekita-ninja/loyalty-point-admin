"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { TQueryParam } from "@/types/query";
import { toObjectQuery } from "@/lib/utils";
import { toast } from "sonner";
import { TFormRole, TResponseRole } from "@/schema/role";

const getList = async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: `roles/all`
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
    url: `roles`,
    params
  })
  return response.data;
}
const getDetail = async (id: string | undefined): Promise<TResponseRole> => {
  const response = await axiosInstance({
    method: 'GET',
    url: `roles/${id}`
  })
  return response.data.data;
}
const createData = async (payload: TFormRole) => {
  const response = await axiosInstance.post("roles", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success create data"
    })
  }
  return response.data;
};

const updateData = async ({ id, ...payload }: TFormRole & { id: string }) => {
  const response = await axiosInstance.patch(`roles/${id}`, payload);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success update data"
    })
  }
  return response.data;
};

const deleteData = async (id: string) => {
  const response = await axiosInstance.delete(`roles/${id}`);
  if (response.status === 200) {
    toast.success('Success', {
      description: "success delete data"
    })
  }
  return response.data;
};

const signRoleMenus = async ({ roleId, menuIds }: { roleId: string, menuIds: string[] }) => {
  const response = await axiosInstance.post(`roles/set-menu`, {
    roleId,
    menuIds
  });

  if (response.status === 200) {
    toast.success('Success', {
      description: "success update role menu"
    })
  }
  return response.data;
}

export const useRole = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const queryRoleAlls = useQuery({
    queryKey: ["roles_all"],
    queryFn: () => getList(),
    // enabled: false
  });
  const queryRoles = useQuery({
    queryKey: ["roles", query],
    queryFn: () => getData(query),
  });

  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  const update = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  return {
    options: {
      data: queryRoleAlls.data,
      isLoading: queryRoleAlls.isLoading,
      error: queryRoleAlls.error,
    },
    lists: {
      data: queryRoles.data,
      isLoading: queryRoles.isLoading,
      error: queryRoles.error,
    },
    create,
    update,
    remove,
    getDetail
  };
}

export const useDetailRole = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const detail = useQuery({
    queryKey: ["detail_role", id],
    queryFn: () => getDetail(id),
  });
  const setRole = useMutation({
    mutationFn: signRoleMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["detail_role"] });
    },
  })
  return {
    ...detail,
    setRole,
  }
}
