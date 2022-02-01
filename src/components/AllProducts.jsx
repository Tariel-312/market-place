import { Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { ClientContext } from '../contexts/ClientProvider';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const {getProducts, products} = useContext(ClientContext)
    useEffect(()=>{
        getProducts();
    },[])
    console.log(products)

    if(!products) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h1>All Products</h1>
            <div>
                <Grid container spacing={4}>
                    {products.map((item)=>(
                        <Grid key={item.id} item xs={12} sm={6} md={4}>   
                            <ProductCard item={item}/>
                        </Grid>
                    ))}

                </Grid>
            </div>
        </div>
    );
};

export default AllProducts;