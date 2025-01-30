"use server";

import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/app";
import { CategoryType } from "@/types/types";

export default async function loadCategoryList(): Promise<
  CategoryType[] | null
> {
  const token = await getCookieServer();

  try {
    const response = await api.get<CategoryType[]>("/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Retorna os dados das categorias
  } catch (err: any) {
    console.error(
      "Erro ao carregar categorias:",
      err.response?.data?.message || err.message
    );
    return null; // Retorna null em caso de erro
  }
}
