import NextLink from 'next/link';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';

export const Navbar = () => {
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link>
                    <Typography variant='h6' >Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
