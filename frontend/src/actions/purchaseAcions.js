import { PURCHASE_SAVE_REQUEST, PURCHASE_SAVE_SUCCESS } from "../constants/purchaseConstants";
import axios from "axios";

const listPurchase = () => async (dispatch, getState) => {
    try {
        dispatch ({type: PURCHASE_SAVE_REQUEST});
        const {userSignin: {userInfo} } = getState();
        const {data} = await axios.get("/api/products/soldout", {
            headers: {
                "Authorization": "Bearer " + userInfo.token
            }
        });
        dispatch({
            type: PURCHASE_SAVE_SUCCESS, payload: data
        })  
     } catch (error) { 
         
     }
}

export {listPurchase}