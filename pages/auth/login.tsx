import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from "../../components/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { useState, useContext } from 'react';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

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

	const router = useRouter();
	const { loginUser } = useContext(AuthContext);
	const [showError, setShowError] = useState(true);

	const handleLoginUser = async( { email, password }: FormData ) => {

		setShowError(false);
		
		const isValidLogin = await loginUser(email, password);

		if( !isValidLogin ){
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			return;
		}

		const destination = router.query.p?.toString() || '/';
		router.replace(destination);
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
							<NextLink href={ router.query.p ? `/auth/register ${ router.query.p }` : '/auth/register'} passHref>
								<Link underline="always">¿No tienes cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
}
