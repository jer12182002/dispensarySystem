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

export const SAVE_ORDER_NOTE = value => {
	newOrderInfo.orderNote = value;
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


export const CLICKED_SUGGESTED_ITEM = (item,orderItemList) => {
		
	orderItemList.forEach(orderItem => {
		if(orderItem.ID === item.ID) {
			alert(`Item ${item.ENGLISH_NAME} ${item.CHINESE_NAME} is already in order. Add this item, the value will be accumulated!`);
		}}); 
	
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



export const ADD_NEW_ORDER_ITEM = (suggestedItem,orderItemList) => {
	
	suggestedItem.raw_gram = parseFloat(document.querySelector("#newOrderItem_Raw input").value);
	suggestedItem.extract_gram = parseFloat(document.querySelector("#newOrderItem_Extract input").value);
	suggestedItem.final_price = parseFloat(document.querySelector("#newOrderItem_Price input").value);

	let newOrderItemList = orderItemList;
	let index = orderItemList.findIndex(orderItem => orderItem.ID === suggestedItem.ID);

	if(index !== -1) {
		newOrderItemList[index].raw_gram = parseFloat(newOrderItemList[index].raw_gram) + suggestedItem.raw_gram;
		newOrderItemList[index].extract_gram = parseFloat(newOrderItemList[index].extract_gram) + suggestedItem.extract_gram;
		newOrderItemList[index].final_price = parseFloat(newOrderItemList[index].final_price) + suggestedItem.final_price;
	}else {
		newOrderItemList.push(suggestedItem);
	}

	return dispatch => {
		dispatch ({
			type: "addNewOrderItem", 
			payload: newOrderItemList
		})

		SET_INPUT_VALUE("#newOrder_Item input", "");
	}
}


export const REMOVE_NEW_ORDER_ITEM = (orderItemList, itemId) => {
	let newOrderItemList = orderItemList.filter(item => item.ID !== itemId);

	return dispatch => {
		dispatch ({
			type: "removeNewOrderItem", 
			payload: newOrderItemList		
		})
	}
}



const ALLOW_ITEM_INPUT = () => {
	REMOVE_ATTRIBUTE("#newOrderItem_Raw input", "disabled");
	REMOVE_ATTRIBUTE("#newOrderItem_Extract input", "disabled");
	REMOVE_ATTRIBUTE("#newOrderItem_Price input", "disabled");
}