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
