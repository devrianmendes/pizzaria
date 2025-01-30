
import { Form } from "./components/createProductForm";

import loadCategoryList from "@/actions/loadCategoryList";

export default async function Product() {

  const response = await loadCategoryList();

  if(!response) return;
  return (
    <main>
      <Form categories={response} />
    </main>
  );
}
