"use client";

import { RefreshCcw } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";
import { OrderContext } from "../../../../../providers/order";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Orders({ orders }: { orders: OrderProps[] | [] }) {
  const { isOpen, onRequestOpen } = useContext(OrderContext);
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
    toast.success("Pedidos atualizados.");
  };

  const handleDetailOrder = async (id: string) => {
    console.log(id)
    await onRequestOpen(id);
  };

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {orders.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto no momento.
            </span>
          )}
          {orders.map((eachOrder) => (
            <button
              className={styles.orderItem}
              onClick={() => handleDetailOrder(eachOrder.id)}
              key={eachOrder.id}
            >
              <div className={styles.tag}></div>
              <span>{eachOrder.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}
