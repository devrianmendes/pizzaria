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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const category = yield prisma_1.default.category.delete({
                    where: {
                        id: id,
                    },
                });
                console.log(category);
                return category;
            }
            catch (err) {
                if (err instanceof Error) {
                    if (err.message.includes("Foreign key constraint violated")) {
                        throw new Error("Existem produtos nessa categoria.");
                    }
                    throw new Error("Erro na conexão com o banco de dados. " + err.message);
                }
                else {
                    throw new Error("Erro genérico.");
                }
            }
        });
    }
}
exports.DeleteCategoryService = DeleteCategoryService;
