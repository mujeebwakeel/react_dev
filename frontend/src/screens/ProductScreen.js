import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {

    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect  (() => {
        dispatch(detailsProduct(props.match.params.id));
        return() => {
            //
        };
    }, []);

    return ( <div>
        <div className="back-to-result">
            <Link to = "/"> Back to result</Link>
        </div>
        { loading? <div>Loading...</div> :
         error? <div>{error}</div> :
        (
            <div className="details">
        <div className="details-image">
            <img  src ={product.image} alt="" />
        </div>
        <div className="details-info">
            <ul>
                <li>
                    <h3>{product.name}</h3>
                </li>
                <li className= "product-brand">
                    {product.brand}
                </li>
                <li>
                    {product.rating} Stars ({product.numReviews} Reviews)
                </li>
                <li>
                    Price:
                    <strong>$ {product.price} </strong>
                </li>
                <li>
                    Description:
                   <div>
                    {product.description} 
                   </div>
                </li>
            </ul>
        </div>
        <div className="details-action">
            <li>
                Price: ${product.price}
            </li>
            <li>
                Status: {product.status}
            </li>
            <li>
                Qty: <select>
                       <option>1</option> 
                       <option>2</option> 
                       <option>3</option> 
                       <option>4</option> 
                       <option>5</option> 
                       <option>6</option> 
                       <option>7</option> 
                    </select>
            </li>
           <li className="add-to-cart">
                <button className= "add-to-cart-button">Add to Cart </button>
            </li>
        </div>
    </div>
        )
        
        }
  </div>

   )
}

export default ProductScreen;