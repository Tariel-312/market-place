import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdminContext } from '../contexts/AdminProvider';
import { Button } from '@mui/material';
import EditRow from './EditRow'



export default function MyTable() {

const {getProducts,products, deleteProduct } = React.useContext(AdminContext)
React.useEffect(()=>{
    getProducts()
},[])

const [editProduct, setEditProduct] = React.useState(null)
console.log(editProduct)

if(!products){
    return <h2>Loading...</h2>
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Brand</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Memory</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align='right'>#</TableCell>
            <TableCell align='right'>#</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => (
              <React.Fragment key={row.id}>
              {editProduct?.id === row.id ? (
                  <EditRow 
                  setEditProduct={setEditProduct}
                  editProduct = {editProduct}
                  
                  />
              ) : (
            <TableRow
           
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">
                  <img width={150} src={row.image} alt="sneakers" />
              </TableCell>
              <TableCell align='right'>
                  <Button onClick={() => setEditProduct(row)}>EDIT</Button>
              </TableCell>
              <TableCell align='right'>
                  <Button onClick={() => deleteProduct(row.id)} >DELETE</Button>
              </TableCell>

            </TableRow>
              )}
            
              </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
