import { getCookieServer } from "@/lib/cookieServer";
import { Form } from "./components/createProductForm";
import { api } from "@/services/app";
import loadCategoryList from "@/actions/loadCategoryList";

export default async function Product() {
  // const response = await api.get("/category", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  const response = await loadCategoryList();

  return (
    <main>
      <Form categories={response} />
    </main>
  );
}
