import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { saveProduct, listProducts } from "../actions/productActions";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const productList = useSelector(state => state.productList);
	const {products, loading, error} = productList;
    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;

    const dispatch = useDispatch();

    useEffect  (() => {
        dispatch(listProducts());
        return() => {
            //
        };
    }, []);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);

    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({name,price,brand,description,category,image,countInStock}));
    }
    
    return ( <div className="content content-margined">
                <div className="product-header">
                    <h2>Products</h2>
                    <button onClick={() => openModal({})}> Create Product</button>
                </div>
                {modalVisible && 
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Create Product</h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="image">Image URL</label>
                                <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="price">Price</label>
                                <input type="Number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="brand">Brand</label>
                                <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="category">Category</label>
                                <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="countInStock">countInStock</label>
                                <input type="Number" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)}>{description}</textarea> 
                            </li>
                            <li>
                                { id ?
                                    <button className="button primary">Update</button>:
                                    <button type="submit" className="button primary">Create</button>
                                }
                            </li>
                            
                        </ul>
                    </form>
                </div>
                }
                <div className="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>                                
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>(<tr>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button onClick={() => openModal(product)}>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>

                </div>
        
        </div>

   )
} 

export default ProductsScreen;

