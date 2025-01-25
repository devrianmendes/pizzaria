"use client";

import { api } from "@/services/app";
import { Button } from "../components/button";
import styles from "./styles.module.scss";
import { getCookieClient } from "@/lib/cookieClient";
import { redirect } from "next/navigation";
import Error from "@/app/dashboard/components/error";
import { toast } from "sonner";

export default function Category() {
  // let errr = { err: false, message: "" };
  const handleRegisterCategory = async (formData: FormData) => {
    const name = formData.get("name");
    if (!name) return;

    const data = { name };

    const token = await getCookieClient();

    try {
      const response = await api.post("/category", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Categoria cadastrada.");
      // redirect("/dashboard");
    } catch (error: any) {
      console.log(error)
      // Garante que o erro tenha uma resposta do Axios
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
    <main className={styles.container}>
      <h1>Nova categoria</h1>

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
      {/* {errr && <Error>{errr.message}</Error>} */}
    </main>
  );
}
