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
          <ul className={styles.navList}>
            <li>
              Pedidos
              <ul className={styles.sublist}>
                <li>
                  <Link href="/dashboard/category/new">Criar</Link>
                </li>
                <li>
                  <Link href="/dashboard/category/manage">
                    Abertos
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              Categoria
              <ul className={styles.sublist}>
                <li>
                  <Link href="/dashboard/category/new">Criar</Link>
                </li>
                <li>
                  <Link href="/dashboard/category/manage">
                    Excluir
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              Produtos
              <ul className={styles.sublist}>
                <li>
                  <Link href="/dashboard/product/new">Criar</Link>
                </li>
                <li>
                  <Link href="/dashboard/product/manage">Excluir</Link>
                </li>

              </ul>
            </li>
          </ul>

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
