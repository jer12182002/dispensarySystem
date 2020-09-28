import {createStore, applyMiddleware} from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

import allReducers from 'redux/reducers/reducer';

const store = createStore(allReducers, applyMiddleware(thunk));

// let currentValue = store.getState();
// store.subscribe(()=> {
// 	const previousValue = currentValue;
// 	currentValue = store.getState();
// 	console.log('pre state:', previousValue, 'next state:', currentValue);
// });

export default store;