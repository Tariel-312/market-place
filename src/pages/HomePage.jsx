import { Container } from '@mui/material';
import React from 'react';
import AllProducts from '../components/AllProducts';
import FilterProducts from '../components/FilterProducts';
import ProductsPagination from '../components/ProductsPagination';

const HomePage = () => {
    return (
        <div>
            <Container>
                <FilterProducts/>
                <AllProducts/>
                <ProductsPagination/>
            </Container>
        </div>
    );
};

export default HomePage;