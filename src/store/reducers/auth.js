//auth的reducer
import * as actionTypes from '../actions/actionsTypes';
import {updateObejct} from  '../../shared/utility';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath: '/'
}; 

const authStart = (state,action)=>{
    return updateObejct(state,{error:null,loading:true});   //刚开始请求的状态
};

const authSuccess = (state,action) =>{
    return updateObejct(state,{
        token:action.idToken,
        userId:action.userId,
        error: null,       //保存error
        loading: false
    });
};

const authFail=(state,action)=>{
    return updateObejct(state,{
        error:action.error,
        loading:false
    });
};

const authLogout= (state,action)=>{
    return updateObejct(state,{token:null, userId:null});       //清空
};

const setAuthRedirectPath = (state,action)=>{
    return updateObejct(state,{authRedirectPath:action.path})
};

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_STRAT: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;