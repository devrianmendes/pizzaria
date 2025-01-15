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

    let orderId = "";

    if (!clientName || !tableNumber) {
      return;
    }

    const token = await getCookieServer();

    const data = {
      name: clientName,
      table: +tableNumber,
    };

    const response = await api
      .post("/createOrder", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    if (!response) return;

    orderId = response.data.id;

    redirect(
      `/dashboard/newOrder/${tableNumber}/details?orderId=${orderId}`
    );
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
