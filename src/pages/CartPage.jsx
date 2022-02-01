import React, { useContext, useEffect } from 'react';
import CartTable from '../components/CartTable';
import { ClientContext } from '../contexts/ClientProvider';

const CartPage = () => {
    const {getCart, cart} = useContext(ClientContext)
    useEffect(()=>{
        getCart()
    },[])
    console.log(cart)
    if(!cart){
        return <h2>Loading...</h2>
    }
    if(cart.products.length === 0){
        return <h2>Нет Избранных</h2>
    }
    return (
        <div>
            <h2>Cart Page</h2>
            <CartTable cart = {cart} />
        </div>
    );
};

export default CartPage;