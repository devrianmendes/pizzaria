import { getCookieServer } from "@/lib/cookieServer";
import { Button } from "../components/button";
import styles from "./styles.module.scss";
import { api } from "@/services/app";
import { redirect } from "next/navigation";

const page = () => {
  const handleOpenOrder = async (formData: FormData) => {
    "use server";
    const clientName = formData.get("clientName");
    const tableNumber = formData.get("tableNumber");
    const token = await getCookieServer();

    let orderId = "";

    if (!clientName || !tableNumber) {
      return;
    }

    const data = {
      name: clientName,
      table: +tableNumber,
    };

    try {
      const response = await api.post("/order", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        orderId = response.data.id;
      }
    } catch (err) {
      if (err instanceof Error)
        console.log(`Erro ao carregar pedido: ${err.message}`);
    } finally {
      if (orderId) {
        redirect(
          `/dashboard/newOrder/${tableNumber}/details?orderId=${orderId}`
        );
      }
    }
  };

  return (
    <section className={styles.container}>
      <form action={handleOpenOrder} className={styles.form}>
        <h1>Novo pedido</h1>
        <input
          type="text"
          placeholder="Nome do cliente"
          className={styles.input}
          name="clientName"
          required
        />
        <input
          type="number"
          placeholder="Número da mesa"
          className={styles.input}
          name="tableNumber"
          required
        />

        <Button name="Novo pedido" />
      </form>
    </section>
  );
};

export default page;
