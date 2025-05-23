"use client";
export interface CheckPermissionItem {
  id: string;
  name: string;
  code: string;
  path: string;
  method: string;
  checked?:boolean
}


export interface RolePermission {
  id: string;
  permission: {
    id: string;
    name: string;
    code: string;
  };
}

export type GroupedPermissions = Record<string, CheckPermissionItem[]>;

