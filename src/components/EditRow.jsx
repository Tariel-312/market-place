import { Button, TableCell, TableRow } from '@mui/material';
import React, {useContext, useState} from 'react';
import { AdminContext } from '../contexts/AdminProvider';

const EditRow = ({editProduct, setEditProduct}) => {
    const [product, setProduct] = useState(editProduct)
    const {saveEditedProduct} = useContext(AdminContext)

    function handleChange(event) {
        let object = {
            ...product,
            [event.target.name]: event.target.value,
        };
        setProduct(object)
    }

    function handleClick(){
        saveEditedProduct(product)
        setEditProduct(null)
    }

    return (
        <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <input name='name' onChange={handleChange} type="text" value={product.name}/>
              </TableCell>
              <TableCell align="right"><input name='brand' onChange={handleChange} type="text" value={product.brand} /></TableCell>
              <TableCell align="right"><input name='price' onChange={handleChange} type="text" value={product.price} /></TableCell>
              <TableCell align="right"><input name='size' onChange={handleChange} type="text" value={product.size}/></TableCell>
              <TableCell align="right"><input name='color' onChange={handleChange} type="text" value={product.color} /></TableCell>
              <TableCell align="right"><input name='image' onChange={handleChange} type="text" value={product.image}/></TableCell>
              <TableCell align='right'>
                  <Button onClick={handleClick} >SAVE</Button>
              </TableCell>

            </TableRow>
    );
};

export default EditRow;