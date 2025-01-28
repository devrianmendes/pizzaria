"use client";

// import { api } from "@/services/app";
// import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import styles from "../page.module.scss";
import { toast, Toaster } from "sonner";
import AuthUser from "@/actions/authUser";
import { useActionState, useEffect } from "react";
// import { useActionState } from "react-dom";

export default function SignInForm() {
  const router = useRouter();

  const [state, action] = useActionState(AuthUser, {
    status: false,
    data: {},
  });

  useEffect(() => {
    if (state.status && state.data.name) {
      console.log(state, "status true");
      toast.success(`Bem-vindo, ${state.data.name}.`);
      router.push("/dashboard");
    } else {
      if (!state.data.message) {
        return;
      }
      toast.error(state.data.message);
    }
  }, [state]);

  return (
    <form action={action}>
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
        Acessar
      </button>
    </form>
  );
}
