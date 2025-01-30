import logoImg from "@/../public/logoSignin.svg";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/app";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import SignInForm from "./components/signInForm";

export default function Home() {
  // const handleLogin = async (formData: FormData) => {
  //   "use server";
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   if (email === "" || password === "") {
  //     console.log("Preencha os campos.");
  //   }

  //   try {
  //     const response = await api.post("/session", {
  //       email,
  //       password,
  //     });

  //     if (!response.data.token) {
  //       return;
  //     }

  //     const expressTime = 60 * 60 * 24 * 30 * 1000;

  //     const cookieStore = await cookies();

  //     cookieStore.set("AuthLogin", response.data.token, {
  //       maxAge: expressTime,
  //       path: "/",
  //       httpOnly: false,
  //       secure: process.env.NODE_ENV === "production",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }

  //   redirect("/dashboard");
  // };

  return (
    <div className={styles.containerCenter}>
      {/* <div className={styles.logoWrapper}>
        <Image src={logoImg} alt="Logo da pizzaria" className={styles.logo} />
      </div> */}
      <picture className={styles.logoWrapper}>
        <source srcSet="logoMobile.svg" media="(max-width: 720px)" />
        <Image src={logoImg} alt="" className={styles.logo} />
      </picture>

      <section className={styles.login}>
        <SignInForm />
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
      </section>
    </div>
  );
}
