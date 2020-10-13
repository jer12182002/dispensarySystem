const LOAD_DEFAULT_ORDER_EDITING_SETTING = "loadDefaultNewOrderSetting";
const FILTER_ITEM_TYPING = "filteritemtyping";
const ORDER_EDITING_SUGGESTED_ITEM_CLICKED = "orderEditingSuggestedItemClicked";
const ADD_ORDER_EDITING_ITEM = "addOrderEditingItem"
const REMOVE_ORDER_EDITING_ITEM = "removeOrderEditingItem";
const SAVE_ORDER_STATUS = "saveOrderStatus";

let orderEditing = {
	orderStatus: 'Quote',
	orderId: undefined,
	filteredItems : [],
	suggestedItem:undefined,
	orderItemList: []
}

export default (state = {}, action)=> {
	switch(action.type) {
		case LOAD_DEFAULT_ORDER_EDITING_SETTING:
			orderEditing = {
				orderStatus: 'Quote',
				orderId: action.payload,
				filteredItems : [],
				suggestedItem:undefined,
				orderItemList: []				
			}

			return orderEditing;
			break;
		case FILTER_ITEM_TYPING:
			
			let orderEditingWithFilteredItem = JSON.parse(JSON.stringify(orderEditing));
			orderEditingWithFilteredItem.filteredItems = action.payload;
			
			return orderEditingWithFilteredItem;
			break;

		case ORDER_EDITING_SUGGESTED_ITEM_CLICKED:
			
			let orderEditingWithSuggestedItem = JSON.parse(JSON.stringify(orderEditing));
			orderEditingWithSuggestedItem.suggestedItem = action.payload
			
			return orderEditingWithSuggestedItem;
			break;

		case ADD_ORDER_EDITING_ITEM:
			
			orderEditing.orderItemList = action.payload;
			
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case REMOVE_ORDER_EDITING_ITEM:
			orderEditing.orderItemList = action.payload;

			return JSON.parse(JSON.stringify(orderEditing));


		case SAVE_ORDER_STATUS:
			orderEditing.orderStatus = action.payload.status;
			orderEditing.orderId = action.payload.orderId;

			return JSON.parse(JSON.stringify(orderEditing));
		default:
		return state;

	}
}