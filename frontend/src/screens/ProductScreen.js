import React from "react"
import data from "../data"
import {Link} from "react-router-dom"

function ProductScreen(props) {
    const product = data.products.find(x => x._id === props.match.params.id);
    return ( <div>
        <div className="back-to-result">
            <Link to = "/"> Back to result</Link>
        </div>
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
        
    </div>

        )
}

export default ProductScreen;