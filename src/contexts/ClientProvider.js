import React, { createContext, useEffect, useReducer, useState } from 'react';
import  axios from 'axios'
import { API } from '../helpers/const';
import { calcSubPrice, calcTotalPrice } from '../helpers/calcPrice';


export const ClientContext = createContext()

let cart = JSON.parse(localStorage.getItem('cart'))
const INIT_STATE = {
    products: null,
    detail:null,
    productsCount: cart ? cart.products.length: 0,
    cart: null,
};
const reducer = (state, action) =>{
    switch(action.type) {
        case 'GET_PRODUCTS':
                return{...state, products: action.payload}
            case "GET_PRODUCT_DETAIL":
                return {...state, detail: action.payload};
            case "ADD_AND_DELETE_PRODUCT_IN_CART":
                 return {...state, productsCount: action.payload}
            case "GET_CART":
                return {...state, cart: action.payload}
        default:
            return state;
    }
};

const ClientProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async ()=>{
        try{
            const response = await axios(`${API}${window.location.search}`)
            let action = {
                type: 'GET_PRODUCTS',
                payload: response.data,
            };
            dispatch(action)
        }catch(error){
            console.log(error)
        }
    }

    const getProductDetail = async (id) =>{
        try{
            const response = await axios (`${API}/${id}`)
            let action = {
                type: "GET_PRODUCT_DETAIL",
                payload: response.data,
            };
            dispatch(action)
        }catch(error){
            console.log(error)
        }
    }

    // ! CART Корзина

    function addAndDeleteProductInCart(product){
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
             cart = {
                products: [],
                totalPrice: 0,
            };

        }
        let cartProduct ={
            product: product,
            count: 1,
            subPrice: 0,
        };
        cartProduct.subPrice = calcSubPrice(cartProduct)
        
        let check = cart.products.find((item)=>{
            return item.product.id === product.id
        })
        if(!check) {
            cart.products.push(cartProduct)
        }else{
            cart.products = cart.products.filter((item)=>{
                return item.product.id !== product.id
            })
        }


        
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))

        let action = {
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length,
        }
        dispatch(action)
    }

    function checkProductInCart(id){
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart={
                products:[],
            }
        }
        let check = cart.products.find((item)=>{
            return item.product.id === id;
        });
        if(!check) {
            return false
        }else{
            return true;
        }
    }

    function getCart (){
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart={
                totalPrice: 0,
                products: []
            };
        }
        let action ={
            type: "GET_CART",
            payload: cart,
        }
        dispatch(action)
    }

    function changeCountCartProduct(value, id){
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map((item)=>{
            if(item.product.id === id){
                item.count = value;
                item.subPrice = calcSubPrice(item);
            }
            return item;
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    function deleteProductInCart(id){
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.filter((item)=> { 
            return item.product.id !== id
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
        let action = {
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length,
        };
        dispatch(action)
    }

    // ! Pagination 

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 9;

    useEffect(()=>{
        if(state.products){
            setPosts(state.products)
        }
    },[state.products])

    const indexOfLastPost = postsPerPage * currentPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalProductsCount = posts.length;
    

    return <ClientContext.Provider value={{
        getProducts: getProducts,
        getProductDetail: getProductDetail,
        addAndDeleteProductInCart: addAndDeleteProductInCart,
        checkProductInCart: checkProductInCart,
        getCart: getCart,
        changeCountCartProduct: changeCountCartProduct,
        deleteProductInCart: deleteProductInCart,
        setCurrentPage: setCurrentPage,
        //products: state.products,
        detail: state.detail,
        productsCount: state.productsCount,
        cart: state.cart,
        products:currentPosts,
        totalProductsCount: totalProductsCount,
        currentPage: currentPage,
        postsPerPage: postsPerPage
    }} 
    >
    {props.children}</ClientContext.Provider>
};

export default ClientProvider;