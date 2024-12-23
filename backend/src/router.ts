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


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Users routes
router.post('/createUser', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/detailUser', isAuthenticated, new DetailUserController().handle);

//Category routes
router.post('/createCategory', isAuthenticated, new CreateCategoryController().handle);
router.get('/listCategory', isAuthenticated, new ListCategoryController().handle);
router.get('/listProductByCategory', isAuthenticated, new ListProductByCategoryController().handle);

//Product routes
router.post('/createProduct', isAuthenticated, upload.single('file'), new CreateProductController().handle);


//Item routes








export {router};