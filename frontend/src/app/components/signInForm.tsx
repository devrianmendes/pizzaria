"use client";

import { useRouter } from "next/navigation";
import styles from "../page.module.scss";
import { toast } from "sonner";
import AuthUser from "@/actions/authUser";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../dashboard/components/button";

export default function SignInForm() {
  const router = useRouter();

  const [state, action] = useActionState(AuthUser, {
    status: false,
    data: {},
  });

  useEffect(() => {
    if (state.status && state.data.name) {
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

      <Button name="Entrar" />
    </form>
  );
}
