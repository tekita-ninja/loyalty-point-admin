"use client"

import { TResponseRanking } from "./master/ranking";
import { TResponseUser } from "./user";

// Define the type for customerPoints array elements
export type TCustomerPoint = {
  id: string;
  transactionId: string;
  rulePointId: string;
  point: number;
  price: number;
  type: string;
  isCancel: boolean;
  isExpired: boolean;
  user: TResponseUser;
  createdBy: TResponseUser;
  rulePoint: {
    id: string;
    isActive: number;
    multiplier: number;
    name: string;
    startDate: string;
    endDate: string;
  }
  transaction: {
    id: string;
    note: string;
    status: string;
    cutPoint: number;
    reward: {
      name: string;
      price: number;
      urlPicture: string;
    } | null;
    location: {
      id: string;
      name: string;
      address: string;
      latitude: number;
      longitude: number;
    } | null;
  } | null;
};

export type TResponseDetailCustomer = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  ranking: TResponseRanking;
  customerPoints: TCustomerPoint[];
  totalPoint: number;
};

export type TResponseCustomer = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  ranking: TResponseRanking;
  customerPoints: {
    point: number;
  };
  totalPoint: number;
};
