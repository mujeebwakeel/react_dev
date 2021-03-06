import Axios from "axios"
import Cookie from "js-cookie"
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGNOUT_SUCCESS} from "../constants/userConstants";

const signin = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: user});
    try {
        const {data} = await Axios.post("/api/users/signin", user);
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data});
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: "Invalid email or password"});
    }
}

const register = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: user});
    try {
        if(user._id){
            const {userSignin: {userInfo} } = getState();
            const {data} = await Axios.put("/api/users/register/"+ user._id, user, {
                headers: {
                    "Authorization": "Bearer " + userInfo.token 
                }
            });
            dispatch({type: USER_REGISTER_SUCCESS, payload:data});
            Cookie.set("userInfo", JSON.stringify(data)); 
        } else {
            const {data} = await Axios.post("/api/users/register", user);
            dispatch({type: USER_REGISTER_SUCCESS, payload:data});        }
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload:"Ensure the email you are using has not been used for registration initially."});
    }
}

const signout = () => (dispatch, setState) => {
    const {userSignin: {userInfo} } = setState({});
    dispatch({type: USER_SIGNOUT_SUCCESS, payload: userInfo});

}
 
export  {signin, register, signout};