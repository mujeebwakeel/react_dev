import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { purchasedItem } from "../actions/cartActions";

function PlaceOrderScreen(props) {
    
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [orderDetails, setOrderDetails] = useState({});
    const dispatch = useDispatch();
    const paypalRef = useRef();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const shippingCart = useSelector(state => state.shipping);
    const {shipping} = shippingCart;
    const paymentCart = useSelector(state => state.payment);
    const {payment} = paymentCart;
    if(!shipping.address){
        props.history.push("/shipping"); 
    } else if(!payment.paymentMethod) {
        props.history.push("/payment"); 
    }

    const handleReturn = (order) => {
        const details = {
            order_time: order.create_time, 
            order_id: order.id, 
            customer_name: userInfo.name, 
            customer_email: userInfo.email,
            order_amount: totalPrice,
            item_number: itemNumber,
            items: cartItems,
            shipping: shipping
           }
        dispatch(purchasedItem(details));
        props.history.push("/");
    }
 

    const itemsPrice = cartItems.reduce((a, c) => a + c.price*c.qty, 0);
    const itemNumber = cartItems.reduce((a, c) => a + c.qty, 0);
    const ShippingPrice = itemsPrice > 100? 70 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = (itemsPrice + ShippingPrice + taxPrice).toFixed(2);

    
useEffect(() => {
    if(window.paypal) {
    window.paypal
         .Buttons({
             createOrder: (data, actions) => {
                 return actions.order.create({
                     intent: 'CAPTURE',
                     purchase_units: [{
                         description: "Whykay Enterprise Checkout",
                         amount: {
                             currency_code: "USD",
                             value: totalPrice
                         }
                     }]
                 })
             },
             onApprove: async (data, actions) => {
                 const order = await actions.order.capture()
                 setPaidFor(true);
                 setOrderDetails(order);
             },
             onError: err => {
                 setError(true);
                 console.log(err); 
             }
         }).render(paypalRef.current)
    }
}, [totalPrice] );

    if(paidFor) {
        return (
            <div className="order-details">
                <ul>
                    <li>
                        Thanks for making the purchase with whykay Enterprise
                    </li>
                    <li>
                        <div>Time of Purchase:</div>
                        <div>{orderDetails.create_time}</div>
                    </li>
                    <li>
                        <div>Order_id:</div>
                        <div>{orderDetails.id}</div>
                    </li>
                    <li>
                        <div>Name of Buyer:</div>
                        <div>{userInfo.name}</div>
                    </li>
                    <li>
                        <div>Buyer's email:</div>
                        <div>{userInfo.email}</div>
                    </li>
                    <li>
                        <div>Shipping address:</div>
                        <div className="shipping-address">
                            {shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
                        </div>
                    </li> 
                    <li>
                        <div>Number of items:</div>
                        <div>{itemNumber}</div>
                    </li>
                    <li>
                        <div>Transaction Amount:</div>
                        <div>$ {totalPrice}</div>
                    </li>
                    <li>
                        <div>Transaction Status:</div>
                        <div>Successful</div>
                    </li>
                    <li className="proceed-to-checkout">
                        <button className="button" type="button" onClick={() => handleReturn(orderDetails)}>Click to return</button>
                    </li>
                </ul>  
            </div>
                   
                )
            }

    if(error) {
        return (
                    <div className="error-message">
                        Error in processing payment. Please try again
                    </div>        
                    
                )
            }
        
        
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping Address</h3>
                        <div>
                            {shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
                        </div>
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method: {payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <div className="shopping-cart">Order Items</div>
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
                                                Qty: {item.qty}
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            ${item.price}
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="placeorder-action">
                    <ul>
                        { 
                            (window.paypal)?
                            <li className="proceed-to-placeorder">
                                <div ref={paypalRef}></div>
                            </li>   
                            :
                            <li className="proceed-to-checkout">
                                <button disabled="true"  className="proceed-to-checkout-button" type="button">You are not connected to Paypal</button>
                            </li>   
                        }
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items Total Price</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${ShippingPrice}</div>
                        </li>
                        <li>
                            <div>tax</div>
                            <div>${+taxPrice.toFixed(2)}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) 
} 


export default PlaceOrderScreen;