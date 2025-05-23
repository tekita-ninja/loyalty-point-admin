"use client";

import { useQuery } from "@tanstack/react-query";

type TGetAuthProfile = {
  fullname:string
  id:string
  roles:string[]
}
function GetAuthProfile(): TGetAuthProfile {
  const dataText = localStorage.getItem('user')
  const dataObj = dataText && JSON.parse(dataText)
  return dataObj
}
export const useProfile = () => {
  return useQuery({
    queryKey: ["get_auth_profile"],
    queryFn: () => GetAuthProfile(),
  });
}
