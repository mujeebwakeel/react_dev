import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_SAVE_REQUEST, CART_SAVE_SUCCESS, PURCHASE_SAVE_SUCCESS, PURCHASE_SAVE_REQUEST } from "../constants/cartConstants";

function cartReducer(state={ cartItems:[]}, action) {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if(product) {
                return { 
                    cartItems:
                        state.cartItems.map(x => x.product === product.product ? item : x)
                }
            }
            return {cartItems: [...state.cartItems, item ]};
        case CART_REMOVE_ITEM:
            const productId = action.payload;
            return {
                cartItems:
                    state.cartItems.filter(x => x.product !== productId)
            }
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload}
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload}
        case CART_SAVE_REQUEST: 
            return {loading: true};
        case CART_SAVE_SUCCESS:
            return {...state, purchase: action.payload}
        case PURCHASE_SAVE_REQUEST:
            return {loading: true, soldout:[]};
        case PURCHASE_SAVE_SUCCESS:
            return {...state, success: true, soldout: action.payload}
        default: 
            return state;
    }
}


export {cartReducer}