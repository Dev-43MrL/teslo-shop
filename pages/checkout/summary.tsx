import { ShopLayout } from "../../components/layouts";
import { Typography, Grid, CardContent, Card, Divider, Box, Button, Link } from '@mui/material';
import { CartList, OrdernSummary } from "../../components/cart";
import NextLink from 'next/link';

export default function SummaryPage() {
  return (
    <ShopLayout title='Resumen de orden' pageDescription="Resumen de la orden">
        <Typography variant="h1" component='h1'> Resumen de la orden </Typography>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList  editable={false}/>
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen (3 productos)</Typography>
                        <Divider sx={{ my:1 }}/>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle1">Direccion de entrega</Typography>
                            <NextLink href='checkout/address'passHref >
                                <Link underline="always" >
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography >Pepito Simon</Typography>
                        <Typography >algun lugar</Typography>
                        <Typography >Direccion existe</Typography>
                        <Typography >Un pais</Typography>
                        <Typography >0223923667</Typography>

                        <Divider sx={{ my:1 }}/>

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart'passHref >
                                <Link underline="always" >
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        
                        <OrdernSummary />

                        <Box>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}
