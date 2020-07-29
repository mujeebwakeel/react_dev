import React, { useEffect } from "react"
import {addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartScreen(props) {
    
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const totalAmount = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const dispatch = useDispatch();
    const handleOnClick = (productId) => {
        dispatch(removeFromCart(productId));
    }

useEffect(() => { 
    if (productId) {
        dispatch(addToCart(productId, qty));
    }
}, [dispatch,productId,qty] );

const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
}

    if(!cartItems) {
        return (
            <div className="error-message">Kindly reload the browser to see the just checkedout items </div>
        )
    }

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <div className="shopping-cart">Shopping Cart</div>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0?
                        <div>Cart is empty</div>
                        :
                        cartItems.map(item => 
                            <li key={item.product}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/"+ item.product}>{item.name}</Link> 
                                    </div>
                                    <div>
                                        Qty: 
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(x =>
                                            <option key={x+1} value={x+1}>{x+1}</option> 
                                             )}
                                        </select>
                                    </div>
                                    <button className="cart-item-delete" onClick={() => handleOnClick(item.product)}>Delete</button>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    :
                    $ {+totalAmount.toFixed(2)}
                </h3>
                <li className="proceed-to-checkout">
                    <button  onClick={checkoutHandler}  className="proceed-to-checkout-button" disabled={cartItems.length === 0}>
                        Proceed to Checkout
                    </button>
                </li>
            </div> 

        </div>
    )
}


export default CartScreen;