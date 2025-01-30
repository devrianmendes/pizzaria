import prismaClient from "../../prisma";

type DelProdProps = {
  itemId: string;
};

class DeleteProductService {
  async execute({ itemId }: DelProdProps) {
    try {
      const product = await prismaClient.product.delete({
        where: {
          id: itemId,
        },
      });
      return product;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("Foreign key constraint violated")) {
          throw new Error("Existem pedidos com esse produto.");
        }
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { DeleteProductService };
