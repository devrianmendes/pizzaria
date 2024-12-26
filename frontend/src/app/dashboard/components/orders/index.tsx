import { RefreshCcw } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";

export function Orders({ orders }: { orders: OrderProps[] | [] }) {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </section>

        {orders.map((eachOrder) => (
          <section className={styles.listOrders}>
            <button className={styles.orderItem}>
              <div className={styles.tag}></div>
              <span>{eachOrder.table}</span>
            </button>
          </section>
        ))}
      </main>

      <ModalOrder />
    </>
  );
}
