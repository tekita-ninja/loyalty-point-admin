import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toObjectQuery = (params: URLSearchParams): Record<string, string> => {
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

import dayjs from 'dayjs';

export const formatToDDMMYYYY = (dateStr: string): string => {
  return dayjs(dateStr).format('DD-MM-YYYY');
}

export function toQueryParams(values: Record<string, any>): string {
  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  return params.toString();
}