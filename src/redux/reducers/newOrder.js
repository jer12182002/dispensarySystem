const FILTER_ITEM_TYPING = "filteritemtyping";
const NEWORDER_SUGGESTED_ITEM_CLICKED = "neworderSuggestedItemClicked";
const ADD_NEW_ORDER_ITEM = "addNewOrderItem"
const REMOVE_NEW_ORDER_ITEM = "removeNewOrderItem";

let newOrder = {
	orderId: undefined,
	filteredItems : [],
	suggestedItem:undefined,
	orderItemList: []
}

export default (state = {}, action)=> {
	switch(action.type) {

		case FILTER_ITEM_TYPING:
			
			let newOrderWithFilteredItem = JSON.parse(JSON.stringify(newOrder));
			newOrderWithFilteredItem.filteredItems = action.payload;
			
			return newOrderWithFilteredItem;
			break;

		case NEWORDER_SUGGESTED_ITEM_CLICKED:
			
			let newOrderWithSuggestedItem = JSON.parse(JSON.stringify(newOrder));
			newOrderWithSuggestedItem.suggestedItem = action.payload
			
			return newOrderWithSuggestedItem;
			break;

		case ADD_NEW_ORDER_ITEM:
			
			newOrder.orderItemList.push(action.payload);
			
			return JSON.parse(JSON.stringify(newOrder));
			break;

		case REMOVE_NEW_ORDER_ITEM:
			newOrder.orderItemList = action.payload;

			return JSON.parse(JSON.stringify(newOrder));

		default:
		return state;

	}
}