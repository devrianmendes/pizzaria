"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  finishOrder: (orderId: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

type OrderItemProps = {
  id: string;
  amount: number;
  createdAt: string;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    categoryId: string;
  };
  order: {
    id: string;
    table: number;
    name: string;
    draft: string;
    status: boolean;
  };
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  const onRequestOpen = async (orderId: string) => {

    const token = getCookieClient();

    const response = await api.get("/detailOrder", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        orderId: orderId,
      },
    });

    setOrder(response.data);
    setIsOpen(true);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const finishOrder = async (orderId: string) => {
    const token = getCookieClient();

    const data = {
      orderId: orderId,
    };

    try {
      await api.put("/finishOrder", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Falha ao finalizar o pedido.");
      return;
    }
    toast.success("Pedido finalizado com sucesso!");
    setIsOpen(false);
    router.refresh();
  };

  return (
    <OrderContext.Provider
      value={{ isOpen, order, onRequestOpen, onRequestClose, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
