import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearProduct } from "../actions/productActions";
import { listPurchase } from "../actions/cartActions";

function SoldGoodsScreen(props) {
    
    const cart = useSelector(state => state.cart);
    const {soldout} = cart;
    const productClear = useSelector(state => state.productClear);
    const {success} = productClear;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    
    const dispatch = useDispatch(); 

    useEffect  (() => {
        
        dispatch(listPurchase()); 
        return() => {
            //
        };
    }, [success]);

    const clearHandler = (product) => {
        dispatch(clearProduct(product._id));
    }

    if(userInfo && userInfo.isAdmin) {
    
        return ( 
                    <div className="product-list">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Buyer_email</th>
                                    <th>Order_time</th>
                                    <th>Item(s)</th>
                                    <th>Order_id</th>
                                    <th>Order_amount</th>
                                    <th>Total Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { soldout.map(product => <tr key={product._id}>
                                    <td>{product.customer_email}</td>
                                    <td>{product.order_time}</td>
                                    <td>
                                        {
                                            product.items.map(item => <ul key={item._id}>
                                                <li>{item.name} : {item.qty} piece(s)</li>
                                            </ul>)
                                        }
                                    </td>
                                    <td>{product.order_id}</td>
                                    <td>{product.order_amount}</td>
                                    <td>{product.item_number}</td>
                                    <td>
                                        <button onClick={() => clearHandler(product)}>Pending</button>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )
    }
        return (
            <div>You are not authorised to use this page. Kindly go back</div>
        )
} 

export default SoldGoodsScreen;

