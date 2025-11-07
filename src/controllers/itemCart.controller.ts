import { Request, Response } from 'express';
import ItemCartService from '../services/itemCart.service';

class ItemCartController {
    async getAll(req: Request, res: Response){
        try {
            const itemCarts = await ItemCartService.getAll()
            res.status(200).json(itemCarts)
        } catch (err : any) {
            res.status(500).json({ error: err.message || 'Error interno del servidor' });
        }
    };
    async getByItemId(req: Request, res: Response){
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        try {
            const itemCart = await ItemCartService.getByItemId(id)
            if(!itemCart){
                return res.status(404).json({error: 'Item cart no encontrado'})
            }
            res.json(itemCart)
        } catch (err : any) {
            res.status(500).json({ error: err.message || 'Error interno del servidor' });
        }
    };
    async getByCartId(req: Request, res: Response){
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Cart ID inválido' });
        }
        try {
            const itemCart = await ItemCartService.getByCartId(id)
            if(!itemCart){
                return res.status(404).json({error: 'Item cart no encontrado'})
            }
            res.json(itemCart)
        } catch (err : any) {
            res.status(500).json({ error: err.message || 'Error interno del servidor' });
        }
    };
    async getByProductId(req: Request, res: Response){
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Product ID inválido' });
        }
        try {
            const itemCart = await ItemCartService.getByProductId(id)
            if(!itemCart){
                return res.status(404).json({error: 'Item cart no encontrado'})
            }
            res.json(itemCart)
        } catch (err : any) {
            res.status(500).json({ error: err.message || 'Error interno del servidor' });
        }
    };
    async create(req: Request, res: Response){
        try {
            const newItemCart = await ItemCartService.create(req.body)
            res.status(201).json(newItemCart)
        } catch (err : any) {
            res.status(500).json({ error: err.message || 'Error interno del servidor' });
        }
    };
    async delete(req: Request, res: Response){
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        try {
            await ItemCartService.delete(id);
            const cart = await ItemCartService.getByItemId(id);
            if (!cart) {
            return res.status(404).json({ error: 'Item carrito no encontrado' });
            }
            res.status(500).json({ message: 'Item carrito eliminado correctamente' });
        } catch (err: any) {
            res.status(500).json({ error: err.message || 'Error interno del servidor' });
        }
    }
}

export default new ItemCartController();