"use client";

import axiosInstance from "@/lib/axios";
import { TResponsePermission } from "@/schema/permission";
import { TFormRolePermission } from "@/schema/role-permissions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export type CheckPermissionItem = {
  id: string;
  name: string;
  code: string;
  path: string;
  method: string;
  checked?: boolean
}
export type RolePermission = {
  id: string;
  permission: {
    id: string;
    name: string;
    code: string;
  };
}
export type GroupedPermissions = Record<string, CheckPermissionItem[]>;

const getRolePermission = async (roleId: string): Promise<CheckPermissionItem[]> => {
  const response = await axiosInstance({
    method: 'GET',
    url: `permissions/all`
  })
  const roleResponse = await axiosInstance.get(`roles/${roleId}`);
  const permissions = response.data.data;
  const currentPermission = roleResponse.data.data.permissions;
  const currentPermissionIds = currentPermission.map((i: RolePermission) => i.permission.id)
  const ownRolePermissions = permissions.map((item: TResponsePermission) => {
    return {
      ...item,
      checked: currentPermissionIds.includes(item.id)
    }
  })
  return ownRolePermissions;
}

const createData = async (payload: TFormRolePermission) => {
  const response = await axiosInstance.post("role-permissions/sign", payload);
  if (response.status === 201) {
    toast.success('Success', {
      description: "success sign permissions"
    })
  }
  return response.data;
};

export const useRolePermission = (roleId: string) => {
  const queryClient = useQueryClient();
  const queryData = useQuery({
    queryKey: ["role_permission"],
    queryFn: () => getRolePermission(roleId),
  });
  const signRolePermissions = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role_permission"] });
    },
  });
  return {
    ...queryData,
    signRolePermissions
  };
}
