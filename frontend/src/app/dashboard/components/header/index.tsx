"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";

import logoImg from "@/../public/logo.svg";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function Header() {
  const handleLogout = async () => {
    deleteCookie("AuthLogin", { path: "/" });
    toast.success("Logout efetuado.");

    redirect("/");
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard" className={styles.logoWrapper}>
          <Image
            src={logoImg}
            priority={true}
            quality={100}
            alt="Logo pizzaria"
            className={styles.logo}
          />
        </Link>
        <nav>
          <Link href="/dashboard/newOrder">Novo pedido</Link>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>

          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon size={24} color="#fff" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
