import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../api";
import { validations } from "../../utils";
import { useState } from 'react';
import { ErrorOutline } from "@mui/icons-material";

type FormData = {
	name: string;
	email: string;
	password: string;
};

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

    const [showError, setShowError] = useState(true);

	const handleRegisterUser = async ({ name, email, password }: FormData) => {

        setShowError(false);

		try {
			const { data } = await tesloApi.post("/user/register", {
				name,
				email,
				password,
			});
			const { token, user } = data;
			console.log({ token, user });
		} catch (error) {
			console.log("Error en las credenciales");
            setShowError(true);
			setTimeout(() => setShowError(false), 3000);
		}
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
							<NextLink href="/auth/login" passHref>
								<Link underline="always">¿Ya tienes cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
}
