import { useState, useContext } from 'react';
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Grid, Typography, Box, Button, Chip } from "@mui/material";

import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { dbProducts } from "../../database";
import { IProduct, ICartProduct, ISize } from "../../interfaces";
import { CartContext } from '../../context';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const { push } = useRouter();
  const { addProductToCart } =  useContext(CartContext);

  const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }));
  }

  const handleUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const handleAddProduct = () => {
    if( !tempCartProduct.size ){
      return; 
    }

    addProductToCart(tempCartProduct);
    push('/cart');
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Titlulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h2">
                Cantidad
              </Typography>
              <ItemCounter 
                currentValue={ tempCartProduct.quantity }
                updateQuantity={ handleUpdateQuantity }
                maxValue={ product.inStock > 5 ? 5 : product.inStock }
              />

              {/* <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes}/> */}
              <SizeSelector 
                sizes={product.sizes} 
                selectedSize={ tempCartProduct.size }
                onSelectedSize={ selectedSize }
              />

              {/* Agregar al Carrito */}
              {( product.inStock > 0 ) ? (
                <Button color="secondary" className="circular-btn" fullWidth onClick={ handleAddProduct }>
                  {tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'
                  }
                </Button>
              ) : (
                <Chip
                  label="No hay disponibles"
                  color="error"
                  variant="outlined"
                />
              )}

              {/* Description */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Descripcion</Typography>
                <Typography variant="body2">{product.description}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// getStaticPaths...
export const getStaticPaths: GetStaticPaths = async () => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

// getStaticProps...
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
