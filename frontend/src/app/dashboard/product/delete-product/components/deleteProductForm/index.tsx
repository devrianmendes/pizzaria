"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/app";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";

import loadProductList from "@/actions/loadProductList";
import loadCategoryList from "@/actions/loadCategoryList";
import { CategoryType, ProductType } from "@/types/types";

export function DeleteForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [productList, setProductList] = useState<ProductType[]>([]);

  const loadCategory = async () => {
    const response = await loadCategoryList();
    if (!response) return;

    setCategoryList(response);
  };

  const loadProduct = async () => {
    const categoryId = selectedCategory;
    if (categoryId === "default") {
      toast.warning("Selecione a categoria.");
      return;
    }

    const response = await loadProductList(categoryId);

    setProductList(response);
  };

  //Carregando lista de categorias ao entrar na pagina
  useEffect(() => {
    loadCategory();
  }, []);

  //Selecionando categoria e carregando produtos
  useEffect(() => {
    loadProduct();
  }, [selectedCategory]);
  
  const handleDelete = async (formData: FormData) => {
    const id = formData.get("product");

    if (!id || id === "default") {
      toast.warning("Selecione um produto.");
      return;
    }

    try {
      const token = getCookieClient();
      const { data } = await api.delete<ProductType>("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { itemId: id },
      });
      toast.success(`${data.name} foi deletado(a).`);
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(`Erro ao deletar: ${err.response.data.message}`);
    }
    loadProduct();
  };

  return (
    <main className={styles.container}>
      <h1>Deletar produto</h1>
      <p>
        O produto só poderá ser deletado se não houver nenhum pedido com ele
        incluso!
      </p>

      <form className={styles.form} action={handleDelete}>
        <select
          name="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="default">Categorias...</option>
          {categoryList.map((eachCategory, index) => (
            <option key={index} value={eachCategory.id}>
              {eachCategory.name}
            </option>
          ))}
        </select>

        <select name="product">
          <option value="default">Produtos...</option>
          {Array.isArray(productList) &&
            productList.map((eachProduct) => (
              <option value={eachProduct.id} key={eachProduct.id}>
                {eachProduct.name}
              </option>
            ))}
        </select>
        <Button name="Deletar produto" />
      </form>
    </main>
  );
}
