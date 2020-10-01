import axios from 'axios';
import moment from 'moment';

import {SET_ATTRIBUTE ,REMOVE_ATTRIBUTE, SET_INPUT_VALUE} from './helperFunctions';


let newOrderInfo = {
	date: moment().format('YYYY-MM-DD'),
	account: "",
	customer: "",
	address: "",
	phone: "",
	email: "",
	status: 'Receipt',
	orderNote: ""
}



export const SAVE_NEW_ORDER = account => {
	newOrderInfo.account = account;

	return dispatch => {
		axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/saveOrder`,{newOrderInfo : newOrderInfo})
		.then(data => {
			console.log(data);
		})
	}
}


export const SAVE_ORDER_DATE = value => {
	newOrderInfo.date = value;
}


export const SAVE_ORDER_CUSTOMER = value => {
	newOrderInfo.customer = value;
}


export const SAVE_ORDER_ADDRESS = value => {
	newOrderInfo.address = value;
}

export const SAVE_ORDER_PHONE = value => {
	newOrderInfo.phone = value;
}

export const SAVE_ORDER_EMAIL = value => {
	newOrderInfo.email = value;
}

export const SAVE_ORDER_STATUS = value => {
	newOrderInfo.status = value;
}








export const FILTER_ITEM_WHILE_TYPING = (value) => {
	let inputValue = value.trim();

	return (dispatch) => {
		if(inputValue) {

			axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/filteritemtyping`,{input : inputValue})
	            .then(data => {
	                if(data.data.result) {
	                    dispatch({
	                        type: 'filteritemtyping', 
	                        payload: data.data.result     
	                    })
	                }
	            })
	            .catch(err => {
	                dispatch ({
	                    type: 'newOrderMsg', 
	                    payload: err.message
	                })
	            })    
	    }
	    else {
	    	BLOCK_ITEM_INPUT();	
	    	
	    	dispatch({
	    		type: 'filteritemtyping', 
	            payload: []    
	    	})
	    }

	}
}


export const CLICKED_SUGGESTED_ITEM = (item) => {
	ALLOW_ITEM_INPUT();
	SET_INPUT_VALUE("#newOrder_Item input", `${item.ENGLISH_NAME} ${item.CHINESE_NAME}`);
	SET_INPUT_VALUE("#newOrderItem_Raw input", item.RATIO);
	SET_INPUT_VALUE("#newOrderItem_Extract input", 1);

	return {
		type: "neworderSuggestedItemClicked",
		payload: item
	}
}



export const ADJUST_GRAM_INPUT = (target, value, ratio) => {
	
	if(target === "EXTRACT"){
		SET_INPUT_VALUE("#newOrderItem_Extract input", (value/ratio).toFixed(2));


	}else if(target==="RAW") {
		SET_INPUT_VALUE("#newOrderItem_Raw input", (value*ratio).toFixed(2));
	}

	else if(target === "PRICE") {

	}
		
}



export const ADD_NEW_ORDER_ITEM = (orderItemList) => {
	console.log(orderItemList);
	return dispatch => {
		dispatch ({

		})
	}
}



const BLOCK_ITEM_INPUT = () => {
	SET_ATTRIBUTE("#newOrderItem_Raw input", "disabled");
	SET_ATTRIBUTE ("#newOrderItem_Extract input", "disabled");
	SET_INPUT_VALUE("#newOrderItem_Raw input", "");    
	SET_INPUT_VALUE("#newOrderItem_Extract input", "");
}

const ALLOW_ITEM_INPUT = () => {
	REMOVE_ATTRIBUTE("#newOrderItem_Raw input", "disabled");
	REMOVE_ATTRIBUTE("#newOrderItem_Extract input", "disabled");
}