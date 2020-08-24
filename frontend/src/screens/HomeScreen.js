import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen (props) {
	const productList = useSelector(state => state.productList);
	const {products, loading, error} = productList;
	const dispatch = useDispatch();
	const searchItem = props.location.search? props.location.search.split("=")[1] : " ";

	useEffect(() =>{
		dispatch(listProducts(searchItem))

		return () => { 
			//
		};  
	}, [searchItem,dispatch]);

    return (

		loading? <div class="text-center">
					<span className="spinner-border" role="status" aria-hidden="true"></span> <span >Loading...</span>
	  			</div> :
		error? <div className="error-message">{error}</div> :
        <ul className="products">
    		{ products.length === 0? <div>Product is out of stock</div>:
    		  products.map(product => 
    		    <li key={product._id}>
      				<div className="product">
      				<Link to={'/product/' + product._id}><img className="product-image" src={product.image} alt="" /></Link>
    						<div className="product-name"><Link to={'/product/' + product._id}>{product.name}</Link></div>
      						<div className="product-brand">{product.brand}</div>
      						<div className="product-price">$ {product.price}</div>
							<div className="product-rating">
									<span className="stars-outer">
										<span style={{width: (product.rating/5)*100 +"%"}} className="stars-inner"></span>
									</span>
							</div>
      				</div>
    			</li>
    		  )
    		}
    
    	</ul>
    )
}

export default HomeScreen;