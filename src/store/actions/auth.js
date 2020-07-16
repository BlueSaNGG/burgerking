import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = ()=>{      //用于loading  spinner
    return {
        type:actionTypes.AUTH_STRAT
    };
};

export const authSuccess = (token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    };
};

export const authFail = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    //退出时清空localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); //ms 转为 s
    };
};


//用于auth的异步函数
export const auth = (email, password, isSignup) =>{   //传入需要signup还是signin
    return dispatch=>{
        dispatch(authStart());
        const authData= {
            email: email,
            password:password,
            returnSecureToken: true
        };
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgMGjA4YKyl3D957SXERhcyGEgUbqZUwk';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgMGjA4YKyl3D957SXERhcyGEgUbqZUwk';
        }
        axios.post(url,authData)
                .then(response=>{
                    //设定localstorage（包括token和timeout）
                    const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);//将s变为ms
                    localStorage.setItem('token',response.data.idToken); //保存token
                    localStorage.setItem('expirationDate',expirationData);
                    localStorage.setItem('userId',response.data.localId);
                    //保存id
                    dispatch(authSuccess(response.data.idToken,response.data.localId));
                    //同时设置登录计时
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                })
                .catch(err=>{
                    dispatch(authFail(err.response.data.error));   //axios提供的err调用方法
                });
    };
};


//将path传入reducer，作为auth的state
export const setAuthRedirectPath = (path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};


export const authCheckState = ()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
                //从ls中得到的为string，需要用new date转为时间
            if(expirationDate > new Date()){  //可以登入
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }else {      //否则就登出
                dispatch(logout());
                //传入自动登出的剩余时间
                
            };
        };
    };
};