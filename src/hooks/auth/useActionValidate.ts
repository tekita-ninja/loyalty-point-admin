"use client";

import { useQuery } from "@tanstack/react-query";

function GetOwnPermission(permission?:string) {
  const dataText = localStorage.getItem('permissions')
  const dataObj:string[] = dataText && JSON.parse(dataText);
  return permission && dataObj.includes(permission)
}
export const useCheckPermission = (permission?:string) => {
  return useQuery({
    queryKey: ["get_own_permission", permission],
    queryFn: () => GetOwnPermission(permission),
  });
}
