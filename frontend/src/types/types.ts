export type CategoryType = {
  id: string;
  name: string;
};

export type ProductType = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
};
