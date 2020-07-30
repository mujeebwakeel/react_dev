import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from "./screens/RegisterScreen"
import { useSelector } from 'react-redux';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import SoldItemsScreen from './screens/SoldGoodsScreen';

function App() {
const userSignin = useSelector(state => state.userSignin);
const {userInfo} = userSignin;
const cart = useSelector(state => state.cart);
const {cartItems} = cart;
  
	const openMenu = () => {
		document.querySelector(".sidebar").classList.add("open");
	}
  
	const closeMenu = () => {
		document.querySelector(".sidebar").classList.remove("open");
	}
  
   	
  return (
    <BrowserRouter>
        <div className="grid-container">
        		<header className="header">
        			<div className="brand">
        				<button className="sidebar-open-button" onClick={openMenu}>
        					&#9776;
        				</button>
        				<Link to = "/">Whykay</Link>
        			</div>
        			<div className="header-links">
						<Link  className="cart-text" to='/cart'><span className="cart-text-format">Cart</span> <span className="num">{cartItems.length}</span></Link>
						{userInfo && userInfo.isAdmin && <Link to="/products">Create-Product</Link>}
						{userInfo && userInfo.isAdmin && <Link to="/sold">Sales Summary</Link>}
						{userInfo? <Link to="/profile">{userInfo.name}</Link>:
						<Link to='/signin'>Sign In</Link> 
  						}
        			</div>
        		</header>
        
        		<main className="main">
        			<div className="content">
					<Route path="/sold" component= {SoldItemsScreen} />
					<Route path="/products" component= {ProductsScreen} />
					<Route path="/shipping" component= {ShippingScreen} />
					<Route path="/payment" component= {PaymentScreen} />
					<Route path="/profile" component= {ProfileScreen} />
					<Route path="/placeorder" component= {PlaceOrderScreen} />
					<Route path="/register" component = {RegisterScreen}/>
					<Route path="/signin" component = {SigninScreen}/>
        			<Route path = "/product/:id" component = {ProductScreen}/>
					<Route path= "/cart/:id?" component = {CartScreen} />
        			<Route path = "/" exact = {true} component = {HomeScreen} />
					
        			</div>
        		</main>
        
        		<aside className="sidebar">
        			<h3>Shopping Categories</h3>
        			<button className="sidebar-close-button" onClick={closeMenu}>
        				X
        			</button>
        				<ul>
        					<li>
        						<Link to="/" onClick={closeMenu}>Shirts</Link>
        					</li>
        					<li>
								<Link to="/?search=Trouser" onClick={closeMenu}>Trousers</Link>
        					</li>
							<li>
								<Link to="/?search=Shoe" onClick={closeMenu}>Shoes</Link>
        					</li>
							<li>
								<Link to="/?search=Watch" onClick={closeMenu}>Wrist-watches</Link>
        					</li>
							<li>
								<Link to="/?search=Sneaker" onClick={closeMenu}>Sneakers</Link>
        					</li>
							<li>
								<Link to="/?search=Belt" onClick={closeMenu}>Belts</Link>
        					</li>
							<li>
								<Link to="/?search=Bracelet" onClick={closeMenu}>Bracelets</Link>
        					</li>
							<li>
								<Link to="/?search=Tie" onClick={closeMenu}>Ties</Link>
        					</li>
							<li>
								<Link to="/?search=Undie" onClick={closeMenu}>Undies</Link>
        					</li>
							<li>
								<Link to="/?search=Slipper" onClick={closeMenu}>Slippers</Link>
        					</li>
        				</ul>
        		</aside>
        
        		<footer className="footer">
        				Powered By Whykay
        		</footer>
    	</div>
    </BrowserRouter>
  );
}

export default App;
