"use client";


import { toObjectQuery } from "@/lib/utils";
import menuService from "@/services/menu.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
const getDetail = async (id:string) => {
  return menuService.GetById(id)
}
export const useMenu = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryClient = useQueryClient();


  const queryMenuAlls = useQuery({
    queryKey: ["menus_all"],
    queryFn: () => menuService.GetListMenu(),
  });
  const queryMenus = useQuery({
    queryKey: ["menus", query],
    queryFn: () => menuService.GetData(query),
  });

  const setMenu = useMutation({
    mutationFn: menuService.SetRoleMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
  const create = useMutation({
    mutationFn: menuService.CreateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
  const update = useMutation({
    mutationFn: menuService.UpdateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
  const remove = useMutation({
    mutationFn: menuService.DeleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
  return {
    menuOptions: {
      data: queryMenuAlls.data,
      isLoading: queryMenuAlls.isLoading,
      error: queryMenuAlls.error,
    },
    menus: {
      data: queryMenus.data,
      isLoading: queryMenus.isLoading,
      error: queryMenus.error,
    },
    create,
    update,
    remove,
    setMenu,
    getDetail
  };
}

export const useAllMenu = () => {
  return useQuery({
    queryKey: ["get_menus_all"],
    queryFn: () => menuService.GetAllMenu(),
  });
}
export const useRoleHasMenu = (roleId: string) => {
  return useQuery({
    queryKey: ["role_has_menu",roleId],
    queryFn: () => menuService.GetRoleHasMenu(roleId),
  });
}
