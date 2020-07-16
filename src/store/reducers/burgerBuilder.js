import * as actionTypes from '../actions/actionsTypes';
import {updateObejct} from '../../shared/utility';

const initialState ={          //定义价格
    ingredients: null,
    totalPrice: 3.7,
    error:false,
    building:false  //添加/删除后改为true
};

const addIngredient=(state,action)=>{
    const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1};
    const updatedIngredients = updateObejct(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObejct(state,updatedState);
};

const removeIngredient=(state,action)=>{
    const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]-1};
    const updatedIngredients = updateObejct(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObejct(state,updatedState);
}


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
            return updateObejct(state,{
                ingredients:action.ingredients,
                error:false,
                totalPrice:3.7,
                building:false //刷新页面则无汉堡在building
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObejct(state,{error:true});
        default:
            return state;
    }
};

export default reducer;