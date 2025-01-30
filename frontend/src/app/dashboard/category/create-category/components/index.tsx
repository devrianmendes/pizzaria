"use client";

import { Button } from "@/app/dashboard/components/button";
import styles from "../../styles.module.scss";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { toast } from "sonner";

export default function Form() {
  const handleRegisterCategory = async (formData: FormData) => {
    const name = formData.get("name");
    if (!name) return;

    const data = { name };

    const token = await getCookieClient();

    try {
      await api.post("/category", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Categoria cadastrada.");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        toast.error("Erro ao cadastrar categoria. Verifique o log.");
      } else {
        toast.error("Erro inesperado. Verifique o log.");
        console.log("Erro inesperado:", error);
      }
    }
  };
  return (
    <form className={styles.form} action={handleRegisterCategory}>
      <input
        type="text"
        name="name"
        placeholder="Nome da categoria"
        required
        className={styles.input}
      />
      <Button name="Cadastrar" />
    </form>
  );
}
