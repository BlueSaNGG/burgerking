import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBulderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
const composeEnhancers = process.env.NODE_ENV==='development'  ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const rootReducer=combineReducers({
     burgerBuilder:burgerBulderReducer,
     order:orderReducer,
     auth:authReducer
});

const store =createStore(rootReducer, composeEnhancers(
     applyMiddleware(thunk)
));

ReactDOM.render(
<Provider store = {store}>
     <BrowserRouter basename='/burgerking'>
          <App />
     </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
