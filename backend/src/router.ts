import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import {AuthUserController} from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { CreateItemController } from './controllers/item/CreateItemController';
import { DeleteItemController } from './controllers/item/DeleteItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Users routes
router.post('/createUser', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/detailUser', isAuthenticated, new DetailUserController().handle);

//Category routes
router.post('/createCategory', isAuthenticated, new CreateCategoryController().handle);
router.get('/listCategory', isAuthenticated, new ListCategoryController().handle);

//Product routes
router.post('/createProduct', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/listProductByCategory', isAuthenticated, new ListProductByCategoryController().handle);

//Order routes
router.post('/createOrder', isAuthenticated, new CreateOrderController().handle);
router.put('/createOrder/send', isAuthenticated, new SendOrderController().handle);
router.delete('/deleteOrder', isAuthenticated, new DeleteOrderController().handle);
router.get('/listOrder', isAuthenticated, new ListOrderController().handle);
router.get('/detailOrder', isAuthenticated, new DetailOrderController().handle);
router.put('/finishOrder', isAuthenticated, new FinishOrderController().handle);

//Item routes
router.post('/createOrder/addItem', isAuthenticated, new CreateItemController().handle);
router.delete('/createOrder/deleteItem', isAuthenticated, new DeleteItemController().handle);








export {router};