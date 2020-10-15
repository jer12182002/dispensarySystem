const LOAD_DEFAULT_ORDER_EDITING_SETTING = "loadDefaultOrderEditingSetting";
const FILTER_ITEM_TYPING = "filteritemtyping";
const ORDER_EDITING_SUGGESTED_ITEM_CLICKED = "orderEditingSuggestedItemClicked";
const ADD_ORDER_EDITING_ITEM = "addOrderEditingItem"
const REMOVE_ORDER_EDITING_ITEM = "removeOrderEditingItem";
const SAVE_ORDER_STATUS = "saveOrderStatus";
const UPDATE_GRAM_SUM = "updateGramSum";
const UPDATE_DOSAGE_PER_DAY = "updateDosagePerDay";
const UPDATE_DAY_PER_SESSION = "updateDayPerSession";
const UPDATE_DISCOUNT_PRICE = "updateDiscountPrice";
const UPDATE_DISCOUNT_PERCENTAGE = "updateDiscountPercentage";
const UPDATE_BOTTLE_FEE = "updateBottleFee";
const UPDATE_TABLET_FEE = "updateTabletFee";
const UPDATE_DELIVERY_FEE = "updateDeliveryFee";
const UPDATE_TAX = "updateTax";

let orderEditing = {
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


		case UPDATE_DISCOUNT_PRICE:
			orderEditing.discountPrice = action.payload;
			return JSON.parse(JSON.stringify(orderEditing));
			break;


		case UPDATE_DISCOUNT_PERCENTAGE:
			orderEditing.discountPercentage = action.payload;
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case UPDATE_BOTTLE_FEE:
			orderEditing.bottleFee = action.payload;
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case UPDATE_TABLET_FEE:
			orderEditing.tabletFee = action.payload;
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case UPDATE_DELIVERY_FEE:
			orderEditing.deliveryFee = action.payload;
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		case UPDATE_TAX:
			orderEditing.tax = action.payload;
			return JSON.parse(JSON.stringify(orderEditing));
			break;

		default:
			return state;
	}
}