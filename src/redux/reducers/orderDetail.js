const LOAD_SAVED_ORDER_EDITING = "loadSavedorderDetail";
const SAVE_ORDER_STATUS = "saveOrderStatus";
const ORDER_DELETED = "orderDeleted";
const DUPLICATE_ORDER = "duplicateOrder";
const UPDATE_ORDER_INFO = "updateOrderInfo";

let orderDetail = {}

export default (state = {}, action)=> {
	switch(action.type) {
		case LOAD_SAVED_ORDER_EDITING:
			orderDetail = action.payload.orderDetail;

			return JSON.parse(JSON.stringify(orderDetail));
			break;


		case SAVE_ORDER_STATUS:
			orderDetail.orderStatus = action.payload.status;
			orderDetail.orderId = action.payload.orderId;

			return JSON.parse(JSON.stringify(orderDetail));
			break;

		case ORDER_DELETED: 
			let newOrderDetail = JSON.parse(JSON.stringify(orderDetail));
			newOrderDetail.orderDeleted = true;
			return newOrderDetail;

		case DUPLICATE_ORDER:
			orderDetail = action.payload;
			return JSON.parse(JSON.stringify(orderDetail));
			break;


		case UPDATE_ORDER_INFO:
			orderDetail = action.payload.orderDetail;
			return JSON.parse(JSON.stringify(orderDetail));
			break;


		default:
			return state;
	}
}