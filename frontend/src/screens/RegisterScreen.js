import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { register } from "../actions/userActions";

function RegisterScreen(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    const dispatch = useDispatch();

    useEffect  (() => {
        if(userInfo) {
            props.history.push("/");
        }
        return() => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name,email,password));
    }
    
    return ( 
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Register</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">Name</label>
                    <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="rePassword">re-Enter Password</label>
                    <input type="password" name="rePassword" id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    <div>Already Have an Account? <Link to="/signin">Sign-in</Link></div>
                </li>
                
            </ul>
        </form>
        
    </div>

   )
} 

export default RegisterScreen;
