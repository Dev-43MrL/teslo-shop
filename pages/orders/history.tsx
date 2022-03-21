import { Typography, Grid, Chip, Link } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    { field: 'paid',
        headerName: 'Pagada',
        description:'Muestra informacion si esta pagada la orden o no', 
        width: 200, 
        renderCell: (params: GridValueGetterParams) =>{
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },
    { field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false, 
        renderCell: (params: GridValueGetterParams) =>{
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }
    },
];

const rows = [
    { id: 1, paid: true, fullname: 'Pepito Juan' },
    { id: 2, paid: false, fullname: 'Zeus' },
    { id: 3, paid: true, fullname: 'Pimpon' },
    { id: 4, paid: false, fullname: 'Tairon' },
    { id: 5, paid: true, fullname: 'Pablo' },
]

export default function HistoryPage() {
  return (
      <ShopLayout title='Historial de Ordenes' pageDescription='Historial de ordenes del cliente'>
        <Typography>Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}/>
            </Grid>
        </Grid>
      </ShopLayout>
  )
}
