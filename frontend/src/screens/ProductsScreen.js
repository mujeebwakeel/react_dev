import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { saveProduct, listProducts, deleteProduct } from "../actions/productActions";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState([]);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const productList = useSelector(state => state.productList);
    const {products} = productList;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const { success: successDelete} = productDelete;
    const allItems = "all"; 

    const dispatch = useDispatch(); 

    useEffect  (() => {
        if(successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts(allItems)); 
        return() => {
            //
        };
    }, [successSave, successDelete, dispatch]);

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
        setRating(product.rating)

    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id:id,name,price,brand,description,category,image,countInStock,rating}));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product));
    }

    
    if(userInfo && userInfo.isAdmin) {
    
    return ( <div className="content content-margined">
                <div className="product-header">
                    <h2>Products</h2>
                    <button className="button primary" onClick={() => openModal({})}> Create Product</button>
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
                                <label htmlFor="name">Name*</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="image">Image URL*</label>
                                <input type = "text" name="image" id="image" onChange={(e) => setImage(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="price">Price($)*</label>
                                <input type="Number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="brand">Brand*</label>
                                <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="category">Category*</label>
                                <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="rating">Rating*</label>
                                <input type="Number" name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="countInStock">countInStock*</label>
                                <input type="Number" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="description">Description*</label>
                                <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea> 
                            </li>
                            <li>*required fields</li>
                            <li>
                                <button type="submit" className="button primary">{ id ? "Update" : "Create" }</button>
                            </li>
                            <li>
                                <button type="button" className="button back" onClick={() => setModalVisible(false)}>Back</button>
                            </li>
                            
                        </ul>
                    </form>
                </div>
                }
                <div className="product-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>                                
                                <th>Name</th>
                                <th>Price</th>
                                <th>Count in Stock</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>(<tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.countInStock}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button onClick={() => openModal(product)}>Edit</button>
                                    {" "}
                                    <button onClick={() => deleteHandler(product._id)}>Delete</button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>

                </div>
        
        </div>
   )
}
return (
    <div>You are not authorised to use this page. Kindly go back</div>
    )
} 

export default ProductsScreen;

