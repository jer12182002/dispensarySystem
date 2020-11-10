const LOAD_SAVED_ORDER_EDITING = "loadSavedOrderEditing";
const SAVE_ORDER_STATUS = "saveOrderStatus";
const UPDATE_ORDER_INFO = "updateOrderInfo";

let orderEditing = {}

export default (state = {}, action)=> {
	switch(action.type) {
		case LOAD_SAVED_ORDER_EDITING:
			orderEditing = action.payload.orderDetail;
			return JSON.parse(JSON.stringify(orderEditing));
			break;


		case SAVE_ORDER_STATUS:
			orderEditing.orderStatus = action.payload.status;
			orderEditing.orderId = action.payload.orderId;

			return JSON.parse(JSON.stringify(orderEditing));
			break;



		case UPDATE_ORDER_INFO:
			orderEditing = action.payload.orderDetail;
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		default:
			return state;
	}
}