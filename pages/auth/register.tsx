import { useState, useContext } from 'react';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";

import { AuthLayout } from "../../components/layouts";
import { AuthContext } from "../../context";

type FormData = {
	name: string;
	email: string;
	password: string;
};

export default function RegisterPage() {

	const router = useRouter();
	const { registerUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

    const [showError, setShowError] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	
	const handleRegisterUser = async ({ name, email, password }: FormData) => {

        setShowError(false);
		const { hasError, message } = await registerUser(name, email, password);
		if( hasError ) {
			setShowError(true);
			setErrorMessage( message! );
			setTimeout(() => setShowError(false), 3000);
			return;
		}
		const destination = router.query.p?.toString() || '/';
		router.replace(destination);
	};

	return (
		<AuthLayout title="Registro">
			<form onSubmit={ handleSubmit(handleRegisterUser) }>
				<Box sx={{ width: 350, padding: "10px 20px" }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h1" component="h1">
								Crear Cuenta
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
                                id='name'
                                className='name'
                                label="Usuario" 
                                variant="filled" 
                                fullWidth
                                { ...register('name', {
									required: "Este campo es obligatorio",
								})}
								error={!!errors.name}
								helperText={errors.name?.message} 
                            />
						</Grid>
						<Grid item xs={12}>
							<TextField 
                                id='email'
                                className="email"
                                label="Correo" 
                                type='email'
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
                                id='password'
                                className='password'
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
								color="secondary"
								className="circular-btn"
								size="large"
								fullWidth
                                type='submit'
							>
								Registrarse
							</Button>
						</Grid>

						<Grid item xs={12} display="flex" justifyContent="end">
							<NextLink href={ router.query.p ? `/auth/login ${ router.query.p }` : '/auth/login'} passHref>
								<Link underline="always">¿Ya tienes cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
}
