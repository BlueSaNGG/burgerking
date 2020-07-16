import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name)=>{            //转为action creator
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    };
};

export const removeIngredient = (name)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:name
    };
};

export const setIngredients =(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    };
};

export const fetchingredientsfailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients=()=>{
    return (dispatch)=>{           //thunk使得dispatch可被传入
        axios.get( '/ingredients.json' )
        .then( response => {
            dispatch(setIngredients(response.data));
        } )
        .catch( error => {
            dispatch(fetchingredientsfailed());
        } );
    };
};