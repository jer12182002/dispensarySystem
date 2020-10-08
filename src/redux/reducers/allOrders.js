const LOAD_ALL_ORDERS = "loadAllOrders";


let allOrders = { 
	allAccountPermission: false, 
	orders: [], 
	draftOrders :[], 
	receiptOrders: []

}




export default(state = {}, action) => {
	switch(action.type) {
		case LOAD_ALL_ORDERS:
			allOrders.allAccountPermission = action.payload.allAccountPermission;
			allOrders.orders = action.payload.orders;
			allOrders.draftOrders = action.payload.draftOrders;
			allOrders.receiptOrders = action.payload.receiptOrders;

		return allOrders
		break;

		default:
		return state;
		break;
	}
} 