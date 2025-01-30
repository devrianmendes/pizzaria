"use client";
import { Button } from "@/app/dashboard/components/button";
import styles from "../../styles.module.scss";
import loadCategoryList from "@/actions/loadCategoryList";
import { useEffect, useState } from "react";
import { CategoryType } from "@/types/types";
import { api } from "@/services/app";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";

export default function Form() {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategoryList = async () => {
    const data = await loadCategoryList();

    if (!data) return;

    setCategoryList(data);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const token = getCookieClient();
      if (selectedCategory === "" || selectedCategory === "default") {
        toast.error("Selecione uma categoria.");
        return;
      }

      const response = await api.delete("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: selectedCategory,
        },
      });

      toast.success(`Categoria ${response.data.name} deletada.`);
      getCategoryList();
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(`Erro ao deletar: ${err.response.data.message}`);
    }
  };
  return (
    <form className={styles.form} action={handleDeleteCategory}>
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
      <Button name="Excluir" />
    </form>
  );
}
