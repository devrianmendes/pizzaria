import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "@/../public/logoSignin.svg";
import SignUpForm from "./components/signupForm";

export default function Signup() {
  return (
    <main>
      <div className={styles.containerCenter}>
        <picture className={styles.logoWrapper}>
          <source srcSet="logoMobile.svg" media="(max-width: 720px)" />
          <Image src={logoImg} alt="" className={styles.logo} />
        </picture>
        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <SignUpForm />

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div>
    </main>
  );
}
