import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
// import { multerConfig } from "./config/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";

import { CreateItemController } from "./controllers/item/CreateItemController";
import { DeleteItemController } from "./controllers/item/DeleteItemController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { extractProductData } from "./middlewares/extractProductData";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));
// const upload = multer(multerConfig.upload("./tmp"));


//Users routes
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/user/me", isAuthenticated, new DetailUserController().handle);

//Category routes
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Product routes
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

// router.post(
//   "/product",
//   isAuthenticated,
//   extractProductData, // Middleware para capturar os dados do produto
//   upload.single("file"), // Middleware do Multer
//   new CreateProductController().handle // Controlador final
// );

router.get(
  "/category/:id/products",
  isAuthenticated,
  new ListProductByCategoryController().handle
);

//Order routes
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.patch(
  "/order/:id/send",
  isAuthenticated,
  new SendOrderController().handle
);
router.delete(
  "/order/:id",
  isAuthenticated,
  new DeleteOrderController().handle
);
router.get("/order", isAuthenticated, new ListOrderController().handle);
router.get("/order/:id", isAuthenticated, new DetailOrderController().handle);
router.patch(
  "/order/:id/finish",
  isAuthenticated,
  new FinishOrderController().handle
);

//Item routes
router.post(
  "/order/:orderId/items",
  isAuthenticated,
  new CreateItemController().handle
);
router.delete(
  "/order/:orderId/item/:id",
  isAuthenticated,
  new DeleteItemController().handle
);

export { router };
