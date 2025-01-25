"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, categoryId } = req.body;
            try {
                if (!name || !price || !description || !categoryId)
                    return res
                        .status(400)
                        .json({ message: "Erro ao criar produto. Preencha os dados." });
                if (!req.file) {
                    return res
                        .status(400)
                        .json({ message: "É necessário enviar uma foto para o produto." });
                }
                else {
                    const { originalname, filename: banner } = req.file;
                    const createProductService = new CreateProductService_1.CreateProductService();
                    const product = yield createProductService.execute({
                        name,
                        description,
                        price,
                        banner,
                        categoryId,
                    });
                    return res.status(200).json(product);
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
        });
    }
}
exports.CreateProductController = CreateProductController;
