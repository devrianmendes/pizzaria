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
exports.SendOrderController = void 0;
const SendOrderService_1 = require("../../services/order/SendOrderService");
class SendOrderController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId } = req.body;
            try {
                if (!orderId) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao enviar pedido. Id Faltante." });
                }
                const sendOrderService = new SendOrderService_1.SendOrderService();
                const order = yield sendOrderService.execute({ orderId });
                return res.status(200).json(order);
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
exports.SendOrderController = SendOrderController;
