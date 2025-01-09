"use client";
import { Button } from "@/app/dashboard/components/button";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { TrashIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

type CategoryType = {
  id: string;
  name: string;
}[];

type ParamsType = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    orderId: string;
    tableNumber: string;
  }>;
};

const page = ({ params, searchParams }: ParamsType) => {
  // const page = ({params, searchParams}: ParamsType) => {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);

  // console.log(resolvedParams, resolvedSearchParams)
  // return <p>a</p>
  const [categoryList, setCategoryList] = useState<CategoryType>([]);
  const [productList, setProductList] = useState<CategoryType>([]);
  let order = {};
  // console.log(searchParams, "params");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  // const resolvedParams = use(params);
  const table = resolvedParams.slug;
  const orderId = resolvedSearchParams.orderId;

  const token = getCookieClient();

  const handleAddItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = {
      orderId: orderId,
      productId: selectedProduct,
      amout: quantity,
    };
    console.log(data)
    // const response = await api
    //   .put("/createOrder/send", data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return;
    //   });

    //   console.log(response, 'retorno de adicionar item a order')
  };

  const handleSendOrder = async () => {
   
  };

  useEffect(() => {
    const getCategoryList = async () => {
      const response = await api
        .get("/listCategory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      if (!response) return;
      setCategoryList(response.data);
    };
    getCategoryList();
  }, []);

  useEffect(() => {
    const categoryId = selectedCategory;

    const getProductList = async () => {
      const response = await api
        .get("/listProductByCategory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { categoryId },
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      if (!response) return;
      setProductList(response.data);
    };
    getProductList();
  }, [selectedCategory]);

  return (
    <section>
      <form>
        <p>
          Mesa <span>{table}</span>
        </p>

        <div>
          <select
            name="categoryRoll"
            id=""
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryList.map((eachCategory) => (
              <option value={eachCategory.id} key={eachCategory.id}>
                {eachCategory.name}
              </option>
            ))}
          </select>
          <TrashIcon />
        </div>
        <div>
          <select
            name="categoryRoll"
            id=""
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            {productList.map((eachProduct) => (
              <option value={eachProduct.id} key={eachProduct.id}>
                {eachProduct.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Quantidade: </p>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={handleAddItem}>+</button>
          <Button name="Avançar" />
        </div>
      </form>
      <ul></ul>
    </section>
  );
};

export default page;
