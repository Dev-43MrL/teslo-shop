import { db } from ".";
import { IProduct, IProductSlug } from "../interfaces";
import { Product } from "../models";


export const getProductBySlug = async( slug: string ): Promise<IProduct | null> => {
    
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if( !product ){
        return null;
    }

    return JSON.parse( JSON.stringify( product ));
}

export const getAllProductSlugs = async(): Promise<IProductSlug[]> => {
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}