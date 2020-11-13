import axios from 'axios';


export const LOAD_REVIEW_ORDER = order_id => {
	return dispatch => {
		if(order_id){
			axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/loadsavedorder?order_id=${order_id}`)
			.then(data => {
				let orderDetail = {
					ORDER_ID: order_id,
					FORMULA: data.data[0].FORMULA,
					DATE: data.data[0].DATE,
					CUSTOMER: data.data[0].CUSTOMER, 
					ADDRESS: data.data[0].ADDRESS, 
					PHONE: data.data[0].PHONE, 
					EMAIL: data.data[0].EMAIL,
				}

				let orderItemList=[]

				data.data.forEach(item=> {
					orderItemList.push({
						ITEM_ID: item.ITEM_ID, 
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

				dispatch({
					type:"loadOrderReview", 
					payload: {orderDetail: orderDetail, orderItemList:orderItemList}
				})
			})
		}
	}
}