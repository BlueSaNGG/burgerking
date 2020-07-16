import * as actionType from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess =(id, orderData)=>{
    return {
        type:actionType.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };
};

export const purchaseBurgerFail = (error)=>{
    return {
        type:actionType.PURCHASE_BURGER_FAIL,
        error:error
    };
};

export const purchaseBurgerStart=()=>{        //用于在reducer中控制loading状态
    return {
        type:actionType.PURCAHSE_BURGER_START
    }
}

//async        不返回一个action，返回一个调用action的异步函数
export const purchaseBurger = (orderData, token) => {        
    return dispatch=>{
        dispatch(purchaseBurgerStart());//在异步调用前改变loading——要用dispatch包裹
        axios.post( '/orders.json?auth='+token, orderData )
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );
    };
};

export const purchaseInit = ()=>{
    return {
        type:actionType.PURCHASE_INIT,
    };
};



//orders  success+fail+asych
export const fetchOrdersSuccess=(orders)=>{
    return {
        type:actionType.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};

export const fetchOrdersFailed=(error)=>{
    return {
        type:actionType.FETCH_ORDERS_FAIL,
        error:error
    };
};

export const fetchOrdersStart=()=>{
    return{
        type:actionType.FETCH_ORDERS_START
    };
};

export const fetchOrders= (token,userId)=>(dispatch)=>{       //actioncreator函数——返回一个action
        dispatch(fetchOrdersStart());
        //加入auth操作
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        //可被firebase理解的query

        axios.get('/orders.json'+queryParams)
            .then(res=>{
                const fetchOrders=[];
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch(error=>{
                dispatch(fetchOrdersFailed(error));
            });
};


//清除order
export const clearorders= ()=>{
    return{
        type:actionType.CLEAR_ORDERS
    };
};