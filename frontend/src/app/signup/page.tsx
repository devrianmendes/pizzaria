import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "@/../public/logoSignin.svg";
import { api } from "@/services/app";
import { redirect } from "next/navigation";

export default function Signup() {
  const handleRegister = async (formData: FormData) => {
    "use server"
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (name === "" || email === "" || password === "")
      console.log("Preencha os campos.");

    try {
      await api.post("/createUser", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }

    redirect("/");
  };

  return (
    <main>
      <div className={styles.containerCenter}>
      <picture className={styles.logoWrapper}>
        <source srcSet="logoMobile.png" media="(max-width: 720px)" />
        <Image src={logoImg} alt="" className={styles.logo}/>
      </picture>
        <section className={styles.login}>
          <h1>Criando sua conta</h1>
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
          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div>
    </main>
  );
}
