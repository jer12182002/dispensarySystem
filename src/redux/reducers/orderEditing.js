const LOAD_DEFAULT_ORDER_EDITING_SETTING = "loadDefaultOrderEditingSetting";
const FILTER_ITEM_TYPING = "filteritemtyping";
const ORDER_EDITING_SUGGESTED_ITEM_CLICKED = "orderEditingSuggestedItemClicked";
const ADD_ORDER_EDITING_ITEM = "addOrderEditingItem"
const REMOVE_ORDER_EDITING_ITEM = "removeOrderEditingItem";
const SAVE_ORDER_STATUS = "saveOrderStatus";
const UPDATE_GRAM_SUM = "updateGramSum";
const UPDATE_DOSAGE_PER_DAY = "updateDosagePerDay";
const UPDATE_DAY_PER_SESSION = "updateDayPerSession";


let orderEditing = {
	orderStatus: 'Quote',
	orderId: undefined,
	filteredItems : [],
	suggestedItem:undefined,
	orderItemList: [], 
	defaultGramSum: 0,
	gramSum:0, 
	dosagePerDay: 1, 
	dayPerSession: 1
}

export default (state = {}, action)=> {
	switch(action.type) {
		case LOAD_DEFAULT_ORDER_EDITING_SETTING:
				orderEditing = {
				orderStatus: 'Quote',
				orderId: undefined,
				filteredItems : [],
				suggestedItem:undefined,
				orderItemList: [], 
				defaultGramSum: 0,
				gramSum:0, 
				dosagePerDay: 1, 
				dayPerSession: 1		
			}

			console.log(orderEditing);
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
			
			orderEditing.orderItemList = action.payload.orderItemList;
			orderEditing.defaultGramSum = action.payload.orderItemListSum
			orderEditing.gramSum = action.payload.orderItemListSum;

			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case REMOVE_ORDER_EDITING_ITEM:
			
			orderEditing.orderItemList = action.payload.orderItemList;
			orderEditing.defaultGramSum = action.payload.orderItemListSum
			orderEditing.gramSum = action.payload.orderItemListSum;

			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case SAVE_ORDER_STATUS:
			orderEditing.orderStatus = action.payload.status;
			orderEditing.orderId = action.payload.orderId;

			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case UPDATE_GRAM_SUM:
			orderEditing.gramSum = action.payload;
		
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case UPDATE_DOSAGE_PER_DAY:
			orderEditing.dosagePerDay = action.payload; 
	
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case UPDATE_DAY_PER_SESSION:
			orderEditing.dayPerSession = action.payload;

			return JSON.parse(JSON.stringify(orderEditing));
			break;

		default:
			return state;
	}
}