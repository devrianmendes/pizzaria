import { getCookieServer } from "@/lib/cookieServer";
// import { Form } from "../components/createProductForm";
import { api } from "@/services/app";
import {DeleteForm} from './components/deleteProductForm';

export default async function Product() {
  // const token = await getCookieServer();

  // const response = await api.get("/category", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  return (
    <main>
      <DeleteForm />
    </main>
  );
}
