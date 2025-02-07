//src/api/shop.ts

import api from './axios';
import { ShopItem } from '@/types';

export const shopApi = {
  getAll: () => api.get<ShopItem[]>('/shop'),
  getOne: (id: string) => api.get<ShopItem>(`/shop/${id}`),
  create: (data: FormData) =>
    api.post<ShopItem>('/shop', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, data: FormData) =>
    api.put<ShopItem>(`/shop/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) => api.delete(`/shop/${id}`)
};