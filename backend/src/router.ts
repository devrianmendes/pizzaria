import {Router} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import {AuthUserController} from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';


const router = Router();

//Users routes
router.post('/createUser', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/detailUser', isAuthenticated, new DetailUserController().handle);

//Category routes
router.post('/createCategory', isAuthenticated, new CreateCategoryController().handle);
router.get('/listCategory', isAuthenticated, new ListCategoryController().handle);

//Product routes
router.post('/createProduct', isAuthenticated, new CreateProductController().handle);


//Item routes








export {router};