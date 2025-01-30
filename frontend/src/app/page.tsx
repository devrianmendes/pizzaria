import logoImg from "@/../public/logoSignin.svg";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./components/signInForm";

export default function Home() {
 

  return (
    <div className={styles.containerCenter}>
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
