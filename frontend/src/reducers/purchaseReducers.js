import { PURCHASE_SAVE_REQUEST, PURCHASE_SAVE_SUCCESS } from "../constants/purchaseConstants";

function purchaseReducer(state={ soldout:[] }, action) {
    switch(action.type) {
        case PURCHASE_SAVE_REQUEST:
            return {loading: true, soldout:[]};
        case PURCHASE_SAVE_SUCCESS:
            return {success: true, soldout: action.payload}
        default: 
            return state;
    }
}

export {purchaseReducer}

