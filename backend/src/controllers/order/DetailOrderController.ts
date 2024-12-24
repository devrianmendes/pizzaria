import {Request, Response} from 'express';
import { DetailOrderService } from '../../services/order/DetailOrderService';

class DetailOrderController{
    async handle(req: Request, res: Response) {

        const orderId = req.query.orderId as string;
        const detailOrderService = new DetailOrderService();

        const detailOrder = await detailOrderService.execute({orderId});

        console.log(detailOrder, "no controller")
        return res.json(detailOrder);
    }
}
export {DetailOrderController};