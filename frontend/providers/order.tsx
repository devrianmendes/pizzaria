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
  sendOrder: (orderId: string) => Promise<void>;
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

    if(response.data.length < 1) {
      
    }

    console.log(response)

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

  const sendOrder = async (orderId: string) => {
    const token = getCookieClient();

    const data = { orderId };

    try {
      const response = await api.put("/createOrder/send", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Pedido enviado.");

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error("Erro ao enviar o pedido.");
      }
    }
  };

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        order,
        onRequestOpen,
        onRequestClose,
        finishOrder,
        sendOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
