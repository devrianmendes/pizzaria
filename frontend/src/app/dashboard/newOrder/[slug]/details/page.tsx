"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { TrashIcon, X } from "lucide-react";
import { use, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderContext } from "../../../../../../providers/order";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const { sendOrder } = useContext(OrderContext);

  const table = resolvedParams.slug;
  const orderId = resolvedSearchParams.orderId;

  const token = getCookieClient();

  const loadOrderList = async () => {
    const response = await api
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

    response && setOrderDetails(response.data);
  };

  const handleAddItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      orderId: orderId,
      productId: selectedProduct,
      amount: quantity,
    };

    if (!selectedProduct || !quantity) {
      toast.error("Preencha os campos.");
      return;
    }

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
    loadOrderList();
  };

  const handleDelItem = async (id: string) => {
    try {
      const response = await api.delete("/createOrder/deleteItem", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          itemId: id,
        },
      });
      loadOrderList();
      toast.success("Item deletado.");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        toast.error("Erro ao deletar item.");
      }
    }
  };

  const handleSendOrder = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendOrder(orderId);
  };

  const handleDelOrder = async () => {
    const response = await api
      .delete("/deleteOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          orderId: orderId,
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });
      router.push("/dashboard");
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
    <main className={styles.container}>
      <section className={styles.detailsContent}>
        <form>
          <header className={styles.formHeader}>
            <h3>
              Mesa <span>{table}</span>
            </h3>
            <TrashIcon className={styles.trash} color="#ff3f4b" onClick={handleDelOrder} />
          </header>

          <div>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="default">Categorias...</option>
              {categoryList.map((eachCategory) => (
                <option value={eachCategory.id} key={eachCategory.id}>
                  {eachCategory.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              onChange={(e) => setSelectedProduct(e.target.value)}
              value={selectedProduct}
            >
              <option value={"default"}>Produtos...</option>
              {productList.map((eachProduct, i) => (
                <option value={eachProduct.id} key={eachProduct.id}>
                  {eachProduct.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.quantity}>
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
          <div className={styles.buttons}>
            <button onClick={handleAddItem} className={styles.addItem}>
              +
            </button>

            <button
              onClick={(e) => handleSendOrder(e)}
              className={styles.sendOrder}
              disabled={orderDetails.length < 1 && true}
              style={{
                opacity: orderDetails.length < 1 ? 0.5 : 1,
                cursor: orderDetails.length < 1 ? "not-allowed" : "pointer",
              }}
            >
              Enviar pedido
            </button>
          </div>
        </form>
        <div className={styles.productList}>
          <ul>
            {orderDetails.map((eachItem) => (
              <li key={eachItem.id}>
                {eachItem.amount} {eachItem.product.name}
                <X
                  size={30}
                  color="#ff3f4b"
                  onClick={() => handleDelItem(eachItem.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default page;
