import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from './screens/CartScreen';

function App() {
  
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
        				<a href="cart.html">Cart</a>
        				<a href="signin.html">Sign In</a>
        			</div>
        		</header>
        
        		<main className="main">
        			<div className="content">
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
        						<a href="imdex.html">Trousers</a>
        					</li>
        					<li>
        						<a href="index.html">Shirts</a>
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
