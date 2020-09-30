const FILTER_ITEM_TYPING = 'filteritemtyping';

let newOrder = {
	filteredItems : []
}

export default (state = {}, action)=> {
	switch(action.type) {

		case FILTER_ITEM_TYPING:
			let newOrderWithFilteredItem = JSON.parse(JSON.stringify(newOrder));
			newOrderWithFilteredItem.filteredItems = action.payload;

			console.log(newOrderWithFilteredItem);
			return newOrderWithFilteredItem;
			break;

		default:
		return state;

	}
}