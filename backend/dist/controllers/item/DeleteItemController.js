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
exports.DeleteItemController = void 0;
const DeleteItemService_1 = require("../../services/item/DeleteItemService");
class DeleteItemController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemId = req.query.itemId;
            const deleteItemService = new DeleteItemService_1.DeleteItemService();
            const item = yield deleteItemService.execute({ itemId });
            return res.json(item);
        });
    }
}
exports.DeleteItemController = DeleteItemController;
