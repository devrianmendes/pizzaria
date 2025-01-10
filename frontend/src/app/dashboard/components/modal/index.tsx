"use client";

import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { OrderContext } from "../../../../../providers/order";

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = useContext(OrderContext);

  const handleFinishOrder = async () => {
    await finishOrder(order[0].order.id);
  };

  console.log(order, 'order')


  return (
    // <dialog className={styles.dialogContainer}>
    //   <section className={styles.dialogContent}>
    //     <button className={styles.dialogBack} onClick={onRequestClose}>
    //       <X size={40} color="#ff3f4b" />
    //     </button>

    //     <article className={styles.container}>
    //       <h2>Detalhes do pedido</h2>
    //       <span className={styles.table}>
    //         Mesa <b>{order[0].order.table}</b>
    //       </span>
    //       {order.map((eachOrder) => (
    //         <section className={styles.item} key={eachOrder.id}>
    //           <span>
    //             {eachOrder.amount} - <b>{eachOrder.product.name}</b>
    //           </span>
    //           <span className={styles.description}>
    //             {eachOrder.product.description}
    //           </span>
    //         </section>
    //       ))}

    //       <button className={styles.buttonOrder} onClick={handleFinishOrder}>
    //         Concluir pedido
    //       </button>
    //     </article>
    //   </section>
    // </dialog>
    <p>ammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</p>
  );
}
