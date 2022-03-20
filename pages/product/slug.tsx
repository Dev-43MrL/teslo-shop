import { Grid, Typography, Box, Button, Chip } from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductSlideshow } from "../../components/products";
import { initialData } from "../../database/products";

const product = initialData.products[0];

export default function ProductPage() {
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
              {/* ItemCounter */}

              {/* Agregar al Carrito */}
              <Button color="secondary" className="circular-btn">
                Agregar al carrito
              </Button>

              {/* <Chip label='No hay disponibles' color="error" variant="outlined" /> */}
              
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
