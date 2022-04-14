import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Grid, Typography, Box, Button } from "@mui/material";

import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

const ProductPage:NextPage<Props> = ({ product }) => {

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Titlulos */}
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h2">Cantidad</Typography>
              <ItemCounter />
              {/* <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes}/> */}
              <SizeSelector sizes={product.sizes}/>

              {/* Agregar al Carrito */}
              <Button color="secondary" className="circular-btn" fullWidth>
                Agregar al carrito
              </Button>

              {/* <Chip label='No hay disponibles' color="error" variant="outlined" fullWidth/> */}
              
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
}

// getStaticPaths...
export const getStaticPaths: GetStaticPaths = async () => {

  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// getStaticProps...
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if( !product ){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}

export default ProductPage