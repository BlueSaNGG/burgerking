import * as actionTypes from '../actions/actionsTypes';
import {updateObejct} from '../../shared/utility';

const initialState={
    orders: [],
    loading: false,
    purchased: false
};

const purchaseSuccess=(state,action)=>{
    const newOrder ={
        ...action.orderData,
        id:action.orderId,
               //成功则redirect
    }; 
    return updateObejct(state,{
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased:true
    });
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObejct(state,{loading:false});
        case actionTypes.PURCAHSE_BURGER_START:
            return updateObejct(state,{loading:true});
        case actionTypes.PURCHASE_INIT:
            return updateObejct(state,{purchased:false});
        case actionTypes.FETCH_ORDERS_START:
            return updateObejct(state,{loading:true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObejct(state,{
                orders:action.orders,
                loading:false
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObejct(state,{loading:false});
        //清除order
        case actionTypes.CLEAR_ORDERS:
            return updateObejct(state,{orders: []});
        default:
            return state;
    }
};

export default reducer;