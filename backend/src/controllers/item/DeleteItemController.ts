import {Request, Response} from 'express';
import { DeleteItemService } from '../../services/item/DeleteItemService';

class DeleteItemController{
    async handle(req: Request, res: Response) {

        const itemId = req.query.itemId as string;

        const deleteItemService = new DeleteItemService();

        const item = await deleteItemService.execute({itemId})
        
        return res.json(item);
    }
}

export {DeleteItemController};