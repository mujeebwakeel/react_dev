import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { register } from "../actions/userActions";

function ProfileScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const userRegister = useSelector(state => state.userRegister);
    const {loading: loadingSave, error:errorSave, success: successSave} = userRegister;

    const dispatch = useDispatch();

    useEffect  (() => {
        if(successSave) {
            document.querySelector(".editProfile").classList.toggle("edit");
        }
        return() => {
            //
        };
    }, [successSave]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register({_id:id,name,email,description}));
    }

    const handleEditProfile = (user) => {
        document.querySelector(".editProfile").classList.toggle("edit");
        setName(user.name);
        setEmail(user.email);
        setId(user._id);
        setDescription(user.description);
    }

    return (
        <div>
            <ul className="profile">
                <li>
                    <div>Name</div>
                    <div>{userInfo.name}</div>
                </li>
                <li>
                    <div>Email</div>
                    <div>{userInfo.email}</div>
                </li>
                <li>
                    <div>An Admin</div>
                    <div>{userInfo.isAdmin? "Yes, an admin" : "Not an admin"}</div>
                </li>
                <li>
                    <div>Description</div>
                    <div className="userinfo-description">{userInfo.description}</div>
                </li>
                <li>
                    <button onClick={() => handleEditProfile(userInfo)}>Edit Profile</button>
                </li>
            </ul>
            <div className="editProfile">
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Edit Your Profile</h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input type="name" name="name" id="name" value={name} onChange={(e) =>  setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="description">Description</label>
                                <textarea type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Update</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;