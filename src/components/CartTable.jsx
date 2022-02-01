import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';
import { ClientContext } from '../contexts/ClientProvider';
import DeleteIcon from '../images/delete.png'
import { Link } from 'react-router-dom';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CartTable({cart}) {
    const {changeCountCartProduct, deleteProductInCart} = React.useContext(ClientContext)
  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Brand</TableCell>
            <TableCell align="right">Model</TableCell>  
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((item) => (
            <TableRow
              key={item.product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.product.name}
              </TableCell>
              <TableCell align="right">{item.product.brand}</TableCell>
              <TableCell align="right">
              <Link to={`/product/${item.product.id}`}>
                  <img width='100' src={item.product.image} alt="product" />
                  </Link>
              </TableCell>
             
              <TableCell align="right">{item.subPrice}</TableCell>
              <TableCell align="right">
                      <img 
                  style={{cursor: 'pointer'}} 
                  width='25px' 
                  src={DeleteIcon} 
                  alt="" 
                  onClick = {()=>deleteProductInCart(item.product.id)}
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
  );
}
