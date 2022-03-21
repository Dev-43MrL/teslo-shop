import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Button, Chip } from '@mui/material';
import { CartList, OrdernSummary } from '../../components/cart';
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

export default function OrderPage() {
  return (
    <ShopLayout title='Resumen de la orden 323242' pageDescription="Resumen de la orden">
        <Typography variant="h1" component='h1'> Orden: asjgasjdh </Typography>

        {/* <Chip sx={{ my: 2 }} label='Pendiente de pago' variant='outlined' color='error' icon={<CreditCardOffOutlined />} /> */}
        <Chip sx={{ my: 2 }} label='Orden ya fue pagada' variant='outlined' color='success' icon={<CreditScoreOutlined />} />
        

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
                            <h1>Pagar</h1>
                            <Chip sx={{ my: 2 }} label='Orden ya fue pagada' variant='outlined' color='success' icon={<CreditScoreOutlined />} />
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}
