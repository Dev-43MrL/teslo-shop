import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from "../../components/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { tesloApi } from "../../api";
import { useState } from 'react';

type FormData = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [showError, setShowError] = useState(true);

	const handleLoginUser = async( { email, password }: FormData ) => {

		setShowError(false);		
		try {
			const { data } = await tesloApi.post('/user/login', { email, password })
			const { token, user } = data;
			console.log({ token, user });

		} catch (error) {
			console.log('Error en las credenciales');
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
		}
	}

	return (
		<AuthLayout title="Ingresar">
			<form onSubmit={ handleSubmit(handleLoginUser) }>
				<Box sx={{ width: 350, padding: "10px 20px" }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h1" component="h1">
								Iniciar Sesion
							</Typography>
							<Chip 
								label='No reconocemos ese usuario / contraseña' 
								color='error'
								icon={<ErrorOutline />}
								className='fadeIn'
								sx={{ display: showError ? 'flex' : 'none' }}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField 
								id="email"
								className="email"
								type="email"
								label="Correo" 
								variant="filled" 
								fullWidth
								{ ...register('email', {
									required: "Este campo es obligatorio",
									validate: validations.isEmail
								})}
								error={!!errors.email}
								helperText={errors.email?.message} 
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="password"
								className="password"
								label="Contraseña"
								type="password"
								variant="filled"
								fullWidth
								{ ...register('password', {
									required: "Este campo es requerido",
									minLength: { value: 6, message: 'Minimo 6 caracteres' }
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								type="submit"
								color="secondary"
								className="circular-btn"
								size="large"
								fullWidth
							>
								Ingresar
							</Button>
						</Grid>

						<Grid item xs={12} display="flex" justifyContent="end">
							<NextLink href="/auth/register" passHref>
								<Link underline="always">¿No tienes cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
}
