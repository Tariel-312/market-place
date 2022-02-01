import { Button, Container, Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClientContext } from '../contexts/ClientProvider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductDetail = () => {
    const params = useParams()
    const {getProductDetail, detail, addAndDeleteProductInCart, checkProductInCart} = useContext(ClientContext)
    useEffect(()=>{
        getProductDetail(params.id)
    },[])
    if(!detail){
        return <h2>Loading...</h2>
    }
    return (
        <Container>
            <h2>Product Detail</h2>
            <div className='product-detail'>
                <Grid container>
                    <Grid item xs={12} sm={8} md={8}>
                       <div>
                    <img src={detail.image} alt={detail.image} />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                <div>
                    <h2>{detail.name}</h2>
                    <ul>
                        <li>
                            <span>Model: </span>
                            <strong>{detail.brand}</strong>
                        </li>
                        <li>
                            <span>Memory: </span>
                            <strong>{detail.size} GB</strong>
                            
                        </li>
                        <li>
                            <span>Color: </span>
                            <strong>{detail.color}</strong>
                        </li>
                    </ul>
                    <h3>Цена: {detail.price} сом</h3>
                    <Stack spacing={1}>
                    <Rating name="size-large" defaultValue={2} size="large" />
                    </Stack>
                    {checkProductInCart(detail.id) ? (
                        <Button 
                        onClick ={()=> addAndDeleteProductInCart(detail)}
                        variant='outlined' 
                        color = 'error'
                        >
                        В корзине
                        </Button>
                    ) : (
                        <Button  
                        onClick ={()=> addAndDeleteProductInCart(detail)}
                         variant='outlined'
                         >
                         В корзину
                        </Button>
                    )}
                </div>
                
                </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default ProductDetail;