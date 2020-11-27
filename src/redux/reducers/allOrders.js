const LOAD_ALL_ORDERS = "loadAllOrders";
const ORDER_FILTERS_UPDATE = "orderFiltersUpdate";

let allOrders = { 
	allAccountPermission: false, 
	orders: [], 
	draftOrders :[], 
	receiptOrders: [],
	orderFilter:""
}




export default(state = {}, action) => {
	switch(action.type) {
		case LOAD_ALL_ORDERS:
			allOrders.allAccountPermission = action.payload.allAccountPermission;
			allOrders.orders = action.payload.orders;
			allOrders.draftOrders = action.payload.draftOrders;
			allOrders.receiptOrders = action.payload.receiptOrders;
			allOrders.orderFilter = "";

		return allOrders
		break;

		case ORDER_FILTERS_UPDATE:

			allOrders.orderFilter = action.payload;
			
		return allOrders;
		break;

		default:
		return state;
		break;
	}
} 