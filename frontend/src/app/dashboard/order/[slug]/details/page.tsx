"use client";
/* eslint no-use-before-define: 2 */ // --> ON

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { TrashIcon, X } from "lucide-react";
import { use, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderContext } from "../../../../../../providers/order";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import loadCategoryList from "@/actions/loadCategoryList";
import loadProductList from "@/actions/loadProductList";

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
    banner: string;
  };
};

const Page = ({ params, searchParams }: ParamsType) => {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);

  const [categoryList, setCategoryList] = useState<CategoryType>([]);
  const [productList, setProductList] = useState<CategoryType>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orderDetails, setOrderDetails] = useState<DetailOrder[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [quantity, setQuantity] = useState("");

  const router = useRouter();

  const { sendOrder } = useContext(OrderContext);

  const table = resolvedParams.slug;
  const orderId = resolvedSearchParams.orderId;

  const token = getCookieClient();

  const loadOrder = async () => {
    const response = await api
      .get(`/order/${orderId}`, {
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

    if (response) setOrderDetails(response.data);
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
      .post(`/order/${data.orderId}/items`, data, {
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
    loadOrder();
  };

  const handleDelItem = async (id: string) => {
    try {
      await api.delete(`/order/${orderId}/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          itemId: id,
        },
      });
      loadOrder();
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
    await api
      .delete(`/order/${orderId}`, {
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

  //Calc order total
  useEffect(() => {
    const total = orderDetails.reduce((acc, cur) => {
      const price = cur.product.price.replace(",", ".");
      return acc + cur.amount * parseFloat(price);
    }, 0);
    setOrderTotal(total);
  }, [orderDetails]);

  // Load category list
  useEffect(() => {
    const loadCategory = async () => {
      const response = await loadCategoryList();
      if (!response) {
        toast.error("Erro ao carregar categorias.");
        return;
      }
      setCategoryList(response);
    };
    loadCategory();
  }, [token]);

  //Load product list
  useEffect(() => {
    const categoryId = selectedCategory;
    if (!categoryId) return;

    const loadProduct = async () => {
      const response = await loadProductList(categoryId);
      setProductList(response);
    };
    loadProduct();
  }, [selectedCategory, token]);

  return (
    <main className={styles.container}>
      <section className={styles.detailsContent}>
        <form>
          <header className={styles.formHeader}>
            <h3>
              Mesa <span>{table}</span> - Total:{" "}
              <span>R${orderTotal.toFixed(2)}</span>
            </h3>
            <TrashIcon
              className={styles.trash}
              color="#ff3f4b"
              onClick={handleDelOrder}
            />
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
              {Array.isArray(productList) &&
                productList.map((eachProduct) => (
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
                <div className={styles.itemBox}>
                  <div>
                    <img
                      src={`http://localhost:3333/tmp/${eachItem.product.banner}`}
                      alt="Nome"
                      width={80}
                      height={80}
                    ></img>
                  </div>
                  <div>
                    <p>
                      {eachItem.amount}x {eachItem.product.name} -{" "}
                      {eachItem.product.description}
                    </p>
                    <p>
                      (Un: R$
                      {(+eachItem.product.price.replace(",", ".")).toFixed(
                        2
                      )} / {eachItem.amount}x: R$
                      {(
                        +eachItem.product.price.replace(",", ".") *
                        eachItem.amount
                      ).toFixed(2)}
                      )
                    </p>
                  </div>
                </div>
                <X
                  className={styles.close}
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

export default Page;
