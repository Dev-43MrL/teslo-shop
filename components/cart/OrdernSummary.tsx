import { Grid, Typography } from '@mui/material';

export const OrdernSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Products</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3 items</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$${144.33}`}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuesto (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$${144.33}`}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant='subtitle1'>Total: </Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>{`$${194.33}`}</Typography>
        </Grid>
    </Grid>
  )
}
