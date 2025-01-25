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
exports.DetailOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailOrderService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ orderId }) {
            try {
                const order = yield prisma_1.default.item.findMany({
                    where: {
                        orderId: orderId,
                    },
                    select: {
                        id: true,
                        amount: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                            },
                        },
                        order: {
                            select: {
                                id: true,
                                name: true,
                                table: true,
                            },
                        },
                    },
                });
                return order;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Erro ao carregar pedido. " + err.message);
                }
                else {
                    throw new Error("Erro inesperado.");
                }
            }
        });
    }
}
exports.DetailOrderService = DetailOrderService;
