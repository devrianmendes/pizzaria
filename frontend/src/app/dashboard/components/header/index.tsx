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
              {/* Pedidos */}
              <Link href="/dashboard/order">Novo pedido</Link>
            </li>
            <li>
              Categoria
              {/* <Link href="/dashboard/category">Categoria</Link> */}
              <ul className={styles.sublist}>
                <li>
                  <Link href="/dashboard/category/create-category">Criar</Link>
                </li>
                <li>
                  <Link href="/dashboard/category/delete-category">Excluir</Link>
                </li>
                {/* <li>Criar</li>
                <li>Excluir</li> */}
              </ul>
            </li>
            <li>
              Produtos
              <ul className={styles.sublist}>
                <li>
                  <Link href="/dashboard/product/create-product">Criar</Link>
                </li>
                <li>
                  <Link href="/dashboard/product/delete-product">Excluir</Link>
                </li>
                {/* <li>Criar</li>
                <li>Excluir</li> */}
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
