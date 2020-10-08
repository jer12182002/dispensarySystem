const LOAD_ORDER_REVIEW = "loadOrderReview";

let orderInfo = {
	orderDetail : {
		ORDER_ID: "", 
		DATE: "",
		CUSTOMER: "", 
		ADDRESS: "", 
		PHONE: "", 
		EMAIL: ""
	},
	orderItemList : []
}

export default (state={}, action) => {
	switch(action.type) {
		case LOAD_ORDER_REVIEW:
			let loadedOrderInfo = JSON.parse(JSON.stringify(orderInfo));
			loadedOrderInfo.orderDetail = action.payload.orderDetail;
			loadedOrderInfo.orderItemList = action.payload.orderItemList;
		
		return loadedOrderInfo;
		break;

		default:
		return orderInfo
		break;
	}
}