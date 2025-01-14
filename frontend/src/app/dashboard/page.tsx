import { api } from "@/services/app";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

const getOrders = async (): Promise<OrderProps[] | []> => {
  try {
    const token = await getCookieServer();

    const response = await api.get("/listOrder", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default async function Dashboard() {
  const orders = await getOrders();

  return (
    <>
      <Orders orders={orders} />
    </>
  );
}
