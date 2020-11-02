import axios from 'axios';
import moment from 'moment';

import {SET_ATTRIBUTE ,REMOVE_ATTRIBUTE, SET_INPUT_VALUE, TOGGLE_CLASS} from './helperFunctions';


let newOrderInfo = {
	orderId: undefined,
	date: new Date(),
	account: "",
	customer: "",
	address: "",
	phone: "",
	email: "",
	orderNote: "",
	status: "Quote",
	orderStatus: "Quote",
	filteredItems : [],
	suggestedItem:undefined,
	orderItemList: [], 
	defaultGramSum: 0,
	gramSum:0, 
	dosagePerDay: 1, 
	dayPerSession: 1,
	discountPrice:0, 
	discountPercentage:0, 
	bottleFee:2, 
	tabletFee: 0,
	deliveryFee:0,
	tax: 13	
}




export const SAVE_ORDER_EDITING = (orderId, account,orderItemList, totalGram) => {
	newOrderInfo.orderId = orderId;
	newOrderInfo.account = account;
	newOrderInfo.orderItemList = orderItemList;
	newOrderInfo.totalGram = totalGram;
	newOrderInfo.orderStatus = newOrderInfo.status;

	 return dispatch => {
		console.log(newOrderInfo);
		// axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/saveorder`,{newOrderInfo : newOrderInfo})
		// .then(data => {
		// 	if(data.data && data.data.orderId){
		// 		alert(`Order Saved, Order Number: ${data.data.orderId}`);
		// 		dispatch({
		// 			type: "saveOrderStatus",
		// 			payload: {
		// 				status: newOrderInfo.orderStatus,
		// 				orderId : data.data.orderId
		// 			}
		// 		})
		// 	}
		// })
	}
}


export const SAVE_ORDER_DATE = newDate => {
	newOrderInfo.date = moment(newDate).format('YYYY-MM-DD');
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}


export const SAVE_ORDER_CUSTOMER = value => {
	newOrderInfo.customer = value;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}


export const SAVE_ORDER_ADDRESS = value => {
	newOrderInfo.address = value;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const SAVE_ORDER_PHONE = value => {
	newOrderInfo.phone = value.replace(/[^0-9]/g,"");
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const SAVE_ORDER_EMAIL = value => {
	newOrderInfo.email = value;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const SAVE_ORDER_STATUS = value => {
	newOrderInfo.status = value;
	console.log(`@@@@${value}`);
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const SAVE_ORDER_NOTE = value => {
	newOrderInfo.orderNote = value;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}




export const LOAD_DEFAULT_SETTING = (orderId = undefined) => {

	newOrderInfo = {
		orderId: undefined,
		date: new Date(),
		account: "",
		customer: "",
		address: "",
		phone: "",
		email: "",
		orderNote: "",
		status: "Quote",
		orderStatus: 'Quote',
		filteredItems : [],
		suggestedItem:undefined,
		orderItemList: [], 
		defaultGramSum: 0,
		gramSum:0, 
		dosagePerDay: 1, 
		dayPerSession: 1,
		discountPrice:0, 
		discountPercentage:0, 
		bottleFee:2, 
		tabletFee: 0,
		deliveryFee:0,
		tax: 13	
	}
	return dispatch => {
		dispatch({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}



export const LOAD_SAVED_ORDER = orderId => {
	return dispatch => {
		if(orderId){
			axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/loadsavedorder?order_id=${orderId}`)
			.then(data => {
				
				newOrderInfo.orderStatus = 'Quote';
				newOrderInfo.orderId = orderId;
				newOrderInfo.filteredItems = [];
				newOrderInfo.date = data.data[0].DATE;
				newOrderInfo.account = data.data[0].ACCOUNT;
				newOrderInfo.customer = data.data[0].CUSTOMER;
				newOrderInfo.address = data.data[0].ADDRESS;
				newOrderInfo.phone = data.data[0].PHONE;
				newOrderInfo.email = data.data[0].EMAIL;
				newOrderInfo.suggestedItem = undefined;
				newOrderInfo.gramSum = data.data[0].TOTAL_GRAM;
				newOrderInfo.dosagePerDay = data.data[0].DOSAGE_PER_DAY;
				newOrderInfo.dayPerSession = data.data[0].DAY_PER_SESSION; 
				newOrderInfo.discountPrice = data.data[0].DISCOUNT_PRICE;
				newOrderInfo.discountPercentage = data.data[0].DISCOUNT_PERCENTAGE;
				newOrderInfo.bottleFee = data.data[0].BOTTLE_FEE;
				newOrderInfo.tabletFee = data.data[0].TABLET_FEE;
				newOrderInfo.deliveryFee = data.data[0].DELIVERY_FEE;
				newOrderInfo.tax = data.data[0].TAX;
				newOrderInfo.orderNote = data.data[0].NOTE;
				

				let orderItemList=[]
				let defaultGramSum = 0;

				data.data.forEach(item=> {
					defaultGramSum+= item.extract_gram;

					orderItemList.push({
						ID: item.ITEM_ID, 
						ENGLISH_NAME: item.ENGLISH_NAME, 
						CHINESE_NAME: item.CHINESE_NAME, 
						TYPE: item.TYPE, 
						RATIO: item.RATIO, 
						QTY: item.QTY, 
						RENDE_PRICE: item.RENDE_PRICE, 
						STUDENT_PRICE: item.STUDENT_PRICE, 
						PROFESSFOR_PRICE: item.PROFESSFOR_PRICE, 
						raw_gram: item.raw_gram, 
						extract_gram: item.extract_gram, 
						final_price: item.final_price
					})
				})

				newOrderInfo.orderItemList = orderItemList;
				newOrderInfo.defaultGramSum = defaultGramSum;
				
				dispatch({
					type:"loadSavedOrderEditing", 
					payload: {orderDetail: newOrderInfo}
				})
			})
		}
	}
}


export const FILTER_ITEM_WHILE_TYPING = (value) => {
	let inputValue = value.trim();
	return (dispatch) => {
		if(inputValue) {

			axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/filteritemtyping`,{input : inputValue})
	            .then(data => {
	                if(data.data.result) {
	                	newOrderInfo.filteredItems = data.data.result;

	                    dispatch({
	                        type: 'updateOrderInfo', 
	                        payload:{orderDetail: newOrderInfo}
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
	    		type: '', 
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

	newOrderInfo.filteredItems = [];
	newOrderInfo.suggestedItem = item;
	return {
		type: 'updateOrderInfo', 
	    payload:{orderDetail: newOrderInfo}
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



export const ADD_ORDER_EDITING_ITEM = (suggestedItem,orderItemList) => {
	
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

	let newOrderItemListSum = newOrderItemList.reduce((total, item)=> total + item.extract_gram, 0);


	newOrderInfo.orderItemList = newOrderItemList;
	newOrderInfo.defaultGramSum = newOrderItemListSum;
	newOrderInfo.gramSum = newOrderItemListSum;

	newOrderInfo.suggestedItem = undefined;


	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})

		SET_INPUT_VALUE("#newOrder_Item input", "");
	}
}



export const REMOVE_ORDER_EDITING_ITEM = (orderItemList, itemId) => {
	let newOrderItemList = orderItemList.filter(item => item.ID !== itemId);
	let newOrderItemListSum = newOrderItemList.reduce((total, item)=> total + item.extract_gram,0 )

	newOrderInfo.orderItemList = newOrderItemList;
	newOrderInfo.defaultGramSum = newOrderItemListSum;
	newOrderInfo.gramSum = newOrderItemListSum;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}



//================================================================
//===================price-display-container functions============
//================================================================
export const UPDATE_GRAM_SUM = defaultGramSum => {
	newOrderInfo.gramSum = defaultGramSum;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const GRAM_PER_DOSE_ON_CHANGE = newGramSum => {
	newOrderInfo.gramSum = newGramSum
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}



export const UPDATE_DOSAGE_PER_DAY = newDosagePerDay => {
	newOrderInfo.dosagePerDay = newDosagePerDay;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}


export const UPDATE_DAY_PER_SESSION = newDayPerSession => {
	newOrderInfo.dayPerSession = newDayPerSession;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}


export const UPDATE_DISCOUNT_PRICE = newDiscountPrice => {
	newOrderInfo.discountPrice = newDiscountPrice;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const UPDATE_DISCOUNT_PERCENTAGE = newDiscountPercentage => {
	newOrderInfo.discountPercentage = newDiscountPercentage;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}


export const UPDATE_BOTTLE_FEE = newBottleFee => {
	newOrderInfo.bottleFee = newBottleFee;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const UPDATE_TABLET_FEE = newTabletFee => {
	newOrderInfo.tabletFee = newTabletFee;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}

export const UPDATE_DELIVERY_FEE = newDeliveryFee => {
	newOrderInfo.deliveryFee = newDeliveryFee;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}


export const UPDATE_TAX = newTax => {
	newOrderInfo.tax = newTax;
	return dispatch => {
		dispatch ({
			type: "updateOrderInfo", 
			payload: {orderDetail: newOrderInfo}
		})
	}
}