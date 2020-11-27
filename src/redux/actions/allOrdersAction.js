import axios from 'axios';

export const LOAD_ALL_ORDERS = (account, permissionToggle=false) => {
	
	return dispatch => {
		axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/loadallorders`)
		.then(data=> {
			
			dispatch({
				type: "loadAllOrders",
				payload: {
					allAccountPermission : permissionToggle,
					orders: data.data.result, 
					draftOrders : permissionToggle? data.data.result.filter(order => order.STATUS === "Quote") :data.data.result.filter(order => order.ACCOUNT === account && order.STATUS === "Quote"), 
					receiptOrders: permissionToggle? data.data.result.filter(order => order.STATUS === "Receipt") : data.data.result.filter(order => order.ACCOUNT === account && order.STATUS === "Receipt")
				}
			})
		})
		.catch(err => {
			dispatch ({
	            type: "accountError", 
	            payload: `Server Error in Account: ${err.message}`
	        })
		})
	}
}



export const UPADTE_ORDER_FILTER = (orderFilter) => {
	return dispatch => {
		dispatch({
			type: "orderFiltersUpdate",
			payload: orderFilter
		})
	}
}


export const FILTER_ORDERS = (orders, orderFilter) => {
	let filter = orderFilter.toLowerCase();

	return orders.filter(order => 
		{
			return order.ACCOUNT && order.ACCOUNT.toString().toLowerCase().includes(filter)
				|| order.FORMULA && order.FORMULA.toString().toLowerCase().includes(filter)
				|| order.ORDER_ID && order.ORDER_ID.toString().toLowerCase().includes(filter)
				|| order.DATE && order.DATE.toString().toLowerCase().includes(filter)
				|| order.CUSTOMER && order.CUSTOMER.toString().toLowerCase().includes(filter)
				|| order.EMAIL && order.EMAIL.toString().toLowerCase().includes(filter)
				|| order.PHONE && order.PHONE.toString().toLowerCase().includes(filter)
		})
}