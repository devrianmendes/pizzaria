"use client";
import { Button } from "@/app/dashboard/components/button";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { TrashIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

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

type DetailOrder = {
  amount: number;
  id: string;
  order: {
    id: string;
    name: string;
    table: number;
  };
  product: {
    description: string;
    id: string;
    name: string;
    price: string;
  };
};

const page = ({ params, searchParams }: ParamsType) => {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);

  const [categoryList, setCategoryList] = useState<CategoryType>([]);
  const [productList, setProductList] = useState<CategoryType>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orderDetails, setOrderDetails] = useState<DetailOrder[]>([]);
  const [quantity, setQuantity] = useState("");

  const table = resolvedParams.slug;
  const orderId = resolvedSearchParams.orderId;

  const token = getCookieClient();

  const handleAddItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      orderId: orderId,
      productId: selectedProduct,
      amount: quantity,
    };

    const response = await api
      .post("/createOrder/addItem", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao adicionar o item.");
        return;
      });

    if (response) {
      toast.success("Item adicionado.");
    }

    const orderDetails = await api
      .get("/detailOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          orderId: orderId,
        },
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao atualizar pedido.");
        return;
      });

    orderDetails && setOrderDetails(orderDetails.data);
    console.log(orderDetails, "order atualizado");
  };

  const handleSendOrder = async () => {};

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
            onChange={(e) => setSelectedCategory(e.target.value)}
            // defaultValue={"Categorias..."}
            value={"default"}
          >
            <option value="default">Categorias...</option>
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
            onChange={(e) => setSelectedProduct(e.target.value)}
            // defaultValue={"Produtos"}
            value={"default"}
          >
            <option value={"default"}>Produtos...</option>
            {productList.map((eachProduct, i) => (
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
      <div>
        <ul>
          {orderDetails.map((eachItem, i) => (
            <li key={i}>
              {eachItem.amount} {eachItem.product.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
