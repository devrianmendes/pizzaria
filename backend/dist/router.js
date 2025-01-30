"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const DeleteCategoryController_1 = require("./controllers/category/DeleteCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListProductByCategoryController_1 = require("./controllers/product/ListProductByCategoryController");
const DeleteProductController_1 = require("./controllers/product/DeleteProductController");
const CreateItemController_1 = require("./controllers/item/CreateItemController");
const DeleteItemController_1 = require("./controllers/item/DeleteItemController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const DeleteOrderController_1 = require("./controllers/order/DeleteOrderController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrderController_1 = require("./controllers/order/ListOrderController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//Users routes
router.post("/user", new CreateUserController_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.get("/user/me", isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
//Category routes
router.post("/category", isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get("/category", isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
router.delete("/category", isAuthenticated_1.isAuthenticated, new DeleteCategoryController_1.DeleteCategoryController().handle);
// Product routes
router.post("/product", isAuthenticated_1.isAuthenticated, upload.single("file"), new CreateProductController_1.CreateProductController().handle);
router.delete("/product", isAuthenticated_1.isAuthenticated, new DeleteProductController_1.DeleteProductController().handle // Controlador final
);
router.get("/category/:id/products", isAuthenticated_1.isAuthenticated, new ListProductByCategoryController_1.ListProductByCategoryController().handle);
//Order routes
router.post("/order", isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.patch("/order/:id/send", isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.delete("/order/:id", isAuthenticated_1.isAuthenticated, new DeleteOrderController_1.DeleteOrderController().handle);
router.get("/order", isAuthenticated_1.isAuthenticated, new ListOrderController_1.ListOrderController().handle);
router.get("/order/:id", isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.patch("/order/:id/finish", isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
//Item routes
router.post("/order/:orderId/items", isAuthenticated_1.isAuthenticated, new CreateItemController_1.CreateItemController().handle);
router.delete("/order/:orderId/item/:id", isAuthenticated_1.isAuthenticated, new DeleteItemController_1.DeleteItemController().handle);
