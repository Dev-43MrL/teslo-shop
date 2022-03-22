import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
    | { msg: string }
    | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            
            return getProductBySlug( req, res );
    
        default:
            return res.status(400).json({
                msg: 'Bad Request'
            });
    }
}

const getProductBySlug = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    await db.connect();

    const { slug } = req.query;
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if( !product ){
        return res.status(404).json({
            msg: 'Producto no encontrado'
        })
    }

    return res.json( product );
}