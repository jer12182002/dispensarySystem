const LOAD_SAVED_ORDER_EDITING = "loadSavedOrderEditing";
const LOAD_DEFAULT_ORDER_EDITING_SETTING = "loadDefaultOrderEditingSetting";

const SAVE_ORDER_STATUS = "saveOrderStatus";

const UPDATE_ORDER_INFO = "updateOrderInfo";

let orderEditing = {}

export default (state = {}, action)=> {
	switch(action.type) {
		case LOAD_SAVED_ORDER_EDITING:
			orderEditing = action.payload.orderDetail;
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case LOAD_DEFAULT_ORDER_EDITING_SETTING:
			orderEditing = {
				orderId: undefined,
				date: new Date(),
				account: "",
				customer: "",
				address: "",
				phone: "",
				email: "",
				orderStatus: 'Quote',
				orderId: undefined,
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

			return orderEditing;
			break;


		case SAVE_ORDER_STATUS:
			orderEditing.orderStatus = action.payload.status;
			orderEditing.orderId = action.payload.orderId;

			return JSON.parse(JSON.stringify(orderEditing));
			break;



		case UPDATE_ORDER_INFO:
			orderEditing = action.payload.orderDetail;
			console.log(orderEditing);
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		default:
			return state;
	}
}