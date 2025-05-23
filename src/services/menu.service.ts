import axiosInstance from "@/lib/axios";
import {
  TFormMenu,
  TFormRoleMenu,
  TResponseListMenu,
  TResponseMenu,
  TRoleMenu
} from "@/schema/menu";
import { TQueryParam } from "@/types/query";
import { toast } from "sonner";

class MenuService {
  async GetData(params?: TQueryParam) {
    const response = await axiosInstance({
      method: 'GET',
      url: `menus`,
      params
    })
    return response.data;
  }
  async GetById(id: string) {
    const response = await axiosInstance({
      method: 'GET',
      url: `menus/${id}`
    })
    return response.data;
  }
  async CreateData(payload: TFormMenu) {
    const response = await axiosInstance.post("menus", payload);
    if (response.status === 201) {
      toast.success('Success', {
        description: "success create data"
      })
    }
    return response.data;
  }
  async UpdateData({ id, ...payload }: TFormMenu & { id: string }) {
    const response = await axiosInstance.patch(`menus/${id}`, payload);
    if (response.status === 200) {
      toast.success('Success', {
        description: "success update data"
      })
    }
    return response.data;
  }
  async DeleteData(id: string) {
    const response = await axiosInstance.delete(`menus/${id}`);
    if (response.status === 200) {
      toast.success('Success', {
        description: "success delete data"
      })
    }
    return response.data;
  };
  // extra
  async GetAllMenu(): Promise<TResponseMenu[]> {
    const response = await axiosInstance({
      method: 'GET',
      url: `menus/all`
    })
    const data = response.data.data;
    return data;
  }
  async GetListMenu(): Promise<TResponseListMenu[]> {
    const response = await this.GetAllMenu()
    const data = response.map((item: any) => {
      return {
        value: item.id,
        label: item.title,
        icon: item.icon
      }
    })
    return data;
  }
  async SetRoleMenu(payload: TFormRoleMenu) {
    const response = await axiosInstance.post("menus/set-role", payload);
    if (response.status === 201) {
      toast.success('Success', {
        description: "success set data"
      })
    }
    return response.data;
  };
  async GetRoleHasMenu(roleId: string): Promise<TRoleMenu[]> {
    const response = await axiosInstance({
      method: 'GET',
      url: `menus/role-menu/${roleId}`
    })
    const data = response.data.data;
    return data;
  }
}

const menuService = new MenuService()
export default menuService;