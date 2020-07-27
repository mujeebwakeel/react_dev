import axios from "axios"
import Cookie from "js-cookie"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_SAVE_SUCCESS, CART_SAVE_REQUEST, PURCHASE_SAVE_REQUEST, PURCHASE_SAVE_SUCCESS } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {

    try {
       const {data} = await axios.get("/api/products/" + productId);
       dispatch({
           type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
       }
    })  
    const {cart: {cartItems} }   = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {  
        
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId});
    const {cart: {cartItems} }   = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data});
    Cookie.set("shipping", JSON.stringify(data));
}

const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
    Cookie.set("payment", JSON.stringify(data));
}

const purchasedItem = (item) => async (dispatch, getState) => {
    try {
        dispatch ({type: CART_SAVE_REQUEST, payload: item});
        const {userSignin: {userInfo} } = getState();
        const {data} = await axios.post("/api/products/purchase", item, {
            headers: {
                "Authorization": "Bearer " + userInfo.token
            }
        });
        dispatch({
            type: CART_SAVE_SUCCESS, payload: data
        })  
     } catch (error) {  
         
     }
}

const listPurchase = () => async (dispatch, getState) => {
    try {
        dispatch ({type: PURCHASE_SAVE_REQUEST});
        const {userSignin: {userInfo} } = getState();
        const {data} = await axios.get("/api/products/soldout", {
            headers: {
                "Authorization": "Bearer " + userInfo.token
            }
        });
        dispatch({
            type: PURCHASE_SAVE_SUCCESS, payload: data
        })  
     } catch (error) { 
         
     }
}

export {addToCart, removeFromCart, saveShipping, savePayment, purchasedItem, listPurchase};