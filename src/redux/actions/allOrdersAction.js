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
	}
}


