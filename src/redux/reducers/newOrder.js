const FILTER_ITEM_TYPING = "filteritemtyping";
const NEWORDER_SUGGESTED_ITEM_CLICKED = "neworderSuggestedItemClicked";
const ADD_NEW_ORDER_ITEM = "addNewOrderItem"


let newOrder = {
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
			newOrderWithSuggestedItem.suggestedItem = action.payload;
		
			return newOrderWithSuggestedItem;
			break;

		case ADD_NEW_ORDER_ITEM:

		break;

		default:
		return state;

	}
}