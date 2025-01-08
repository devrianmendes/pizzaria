"use client";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { TrashIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

type PageParams = {
  params: {
    slug: string;
  };
};

const page =  ({ params }: { params: Promise<{ slug: string }> }) => {
  const [categoryList, setCategoryList] = useState({});
  const resolvedParams = use(params);
  const table = resolvedParams.slug;
  // const handleAddItem = async () => {
  //   "use server"

  // };

  useEffect(() => {
    const getCategoryList = async () => {

      const categoryList = await api
        .get("/listCategory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      console.log(categoryList);
    };

    setCategoryList(getCategoryList());
  }, []);

  const token = getCookieClient();

  return (
    <section>
      <form>
        <p>
          Mesa <span>{table}</span>
        </p>

        <select name="categoryRoll" id="">
          <option>Teste</option>
          <option>Teste2</option>
          <option>Teste3</option>
          <option>Teste4</option>
        </select>
        <TrashIcon />
      </form>
    </section>
  );
};

export default page;
