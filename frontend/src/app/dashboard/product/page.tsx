import { getCookieServer } from "@/lib/cookieServer";
import { Form } from "./new/components/createProductForm";
import { api } from "@/services/app";

export default async function Product() {
  const token = await getCookieServer();

  const response = await api.get("/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <main>
      <Form categories={response.data} />
    </main>
  );
}
