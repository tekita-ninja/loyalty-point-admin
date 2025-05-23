"use client";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';
export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: 'auth/login',
        data: {
          email,
          password
        }
      })
      if (response.status !== 200) {
        setError(response.data.message)
      }
      
      const data = response.data.data;
      Cookies.set('token',data.accessToken)
      Cookies.set('refreshtoken', data.refreshToken)
      localStorage.setItem('permissions',JSON.stringify(data.permissions))
      localStorage.setItem('roles', JSON.stringify(data.roles))
      localStorage.setItem('user', JSON.stringify(data.user))
      const sidemenu = await axiosInstance({
        url: 'sidemenu',
        headers: {
          Authorization: `Bearer ${data.accessToken}`
        }
      })
      localStorage.setItem('sidemenus', JSON.stringify(sidemenu.data.data))
      router.push('/');
    } catch (error:any) {
      setError(error.response.data.message)
      console.log(error.response.status)
      setLoading(false)
    }
  }

  const logout = async () => {
    Cookies.remove('token')
    Cookies.remove('refreshtoken')
    localStorage.removeItem('permissions')
    localStorage.removeItem('roles')
    localStorage.removeItem('sidemenus')
    localStorage.removeItem('user')
    router.push('/login');
  }
  return {
    loading,
    login,
    error,
    logout
  }
}
