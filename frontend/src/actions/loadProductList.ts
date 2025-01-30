"use server";

import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/app";

export default async function loadProductList(categoryId: string) {
  const token = await getCookieServer();

  const response = await api
    .get(`/category/${categoryId}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { categoryId },
    })
    .catch((err: any) => {
      console.log(err.response.data.message);
      return;
    });

  if (!response) return;

  return response.data;
}
