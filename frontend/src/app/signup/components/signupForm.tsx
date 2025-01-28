"use client";

import { api } from "@/services/app";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import styles from "../../page.module.scss";

export default function SignUpForm() {
  const router = useRouter();
  const handleRegister = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (name === "" || email === "" || password === "")
      console.log("Preencha os campos.");

    try {
      const response = await api.post("/user", {
        name,
        email,
        password,
      });

      toast.success(`Usuário ${response.data.name} criado.`);
      router.push("/");
    } catch (err: any) {
      if (err) {
        toast.error(err.response.data.message);
        console.log(err);
      }
    }
  };
  return (
    <form action={handleRegister}>
      <input
        type="text"
        required
        name="name"
        placeholder="Digite seu nome..."
        className={styles.input}
      />
      <input
        type="email"
        required
        name="email"
        placeholder="Digite seu email..."
        className={styles.input}
      />
      <input
        type="password"
        required
        name="password"
        placeholder="***************"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Cadastrar
      </button>
    </form>
  );
}
