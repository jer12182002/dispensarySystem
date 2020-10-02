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
	                    type: 'newOrderErrorMsg', 
	                    payload: err.message
	                })
	                SET_INPUT_VALUE("#newOrder_Item input", "");
	            })    
	    }
	    else {
	    	SET_INPUT_VALUE("#newOrder_Item input", "");
	    	dispatch({
	    		type: 'filteritemtyping', 
	            payload: {
	            }   
	    	})
	    }

	}
}


export const CLICKED_SUGGESTED_ITEM = (item) => {
	SET_INPUT_VALUE("#newOrder_Item input", `${item.ENGLISH_NAME} ${item.CHINESE_NAME}`);

	return {
		type: "neworderSuggestedItemClicked",
		payload: item
	}
}



export const ADJUST_GRAM_INPUT = (target, value, item, account) => {
	let price = 0;
	
	switch (account) {
	    case "RenDeInc":   
	    	price = item.RENDE_PRICE;
	    break;

	    case "Professor":
	    	price = item.PROFESSOR_PRICE;
	    break;

	    case "Student":  
	    	price = item.STUDENT_PRICE;
		break;
	}	


	if(target === "EXTRACT"){
		SET_INPUT_VALUE("#newOrderItem_Extract input", (value/item.RATIO).toFixed(2));
		SET_INPUT_VALUE("#newOrderItem_Price input",(value/item.RATIO*price).toFixed(2));


	}else if(target==="RAW") {
		SET_INPUT_VALUE("#newOrderItem_Raw input", (value*item.RATIO).toFixed(2));
		SET_INPUT_VALUE("#newOrderItem_Price input",(value*price).toFixed(2));
		
	}

	else if(target === "PRICE") {
		SET_INPUT_VALUE("#newOrderItem_Extract input", (value/price).toFixed(2));
		SET_INPUT_VALUE("#newOrderItem_Raw input", (value/price*item.RATIO).toFixed(2));
	}
		
}



export const ADD_NEW_ORDER_ITEM = (suggestedItem) => {
	
	suggestedItem.raw_gram = document.querySelector("#newOrderItem_Raw input").value;
	suggestedItem.extract_gram = document.querySelector("#newOrderItem_Extract input").value;
	suggestedItem.final_price = document.querySelector("#newOrderItem_Price input").value;

	

	return dispatch => {
		dispatch ({
			type: "addNewOrderItem", 
			payload: suggestedItem
		})

		SET_INPUT_VALUE("#newOrder_Item input", "");
	}
}




const ALLOW_ITEM_INPUT = () => {
	REMOVE_ATTRIBUTE("#newOrderItem_Raw input", "disabled");
	REMOVE_ATTRIBUTE("#newOrderItem_Extract input", "disabled");
	REMOVE_ATTRIBUTE("#newOrderItem_Price input", "disabled");
}