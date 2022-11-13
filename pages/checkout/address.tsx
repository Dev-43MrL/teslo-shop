import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import { ShopLayout } from "../../components/layouts";
import { countries } from '../../utils';
import { useRouter } from 'next/router';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

export default function AddressPage() {
    const router =useRouter();
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[0].code,
            phone: ''
        }
    });

    const onSubmitAddress = (data: FormData) => {
        Cookies.set('firstName', data.firstName)
        Cookies.set('lastName', data.lastName)
        Cookies.set('address', data.address)
        Cookies.set('address2', data.address2 || '')
        Cookies.set('zip', data.zip)
        Cookies.set('city', data.city)
        Cookies.set('country', data.country)
        Cookies.set('phone', data.phone)
        router.push('/checkout/summary')
    }

  return (
    <ShopLayout title='Direccion' pageDescription="Confirmar direccion del destino">
        <Typography variant="h1" component='h1'>Direccion</Typography>
        <form onSubmit={ handleSubmit(onSubmitAddress) }>

        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label='Nombre' 
                    variant='filled'
                    fullWidth
                    { ...register('firstName', {
                        required: "Este campo es obligatorio"
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}  
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label='Apellido' 
                    variant='filled' 
                    fullWidth
                    { ...register('lastName', {
                        required: "Este campo es obligatorio"
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message} 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label='Direccion' 
                    variant='filled' 
                    fullWidth
                    { ...register('address', {
                        required: "Este campo es obligatorio"
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message} 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label='Direccion 2 (opcional)' 
                    variant='filled' 
                    fullWidth
                    { ...register('address2')}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label='Codigo Postal' 
                    variant='filled' 
                    fullWidth
                    { ...register('zip', {
                        required: "Este campo es obligatorio"
                    })}
                    error={!!errors.zip}
                    helperText={errors.zip?.message}  
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label='Ciudad' 
                    variant='filled' 
                    fullWidth
                    { ...register('city', {
                        required: "Este campo es obligatorio"
                    })}
                    error={!!errors.city}
                    helperText={errors.city?.message}  
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel>Pais</InputLabel>
                    <TextField
                        select
                        variant='filled'
                        label='Pais'
                        defaultValue={ countries[0].code }
                        { ...register('country', {
                            required: "Este campo es obligatorio"
                        })}
                        error={!!errors.country}
                        helperText={errors.city?.message}  
                    >
                        { countries.map( country => (
                            <MenuItem 
                                key={ country.code }
                                value={ country.code }
                            >{ country.name }</MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label='Telefono' 
                    variant='filled' 
                    fullWidth 
                />
            </Grid>
        </Grid>
        <Box sx={{ mt:5 }} display='flex' justifyContent='center'>
            <Button type='submit' color='secondary' className='circular-btn' size='large'>
                Revisar Pedido
            </Button>
        </Box>

        </form>
    </ShopLayout>
  )
}