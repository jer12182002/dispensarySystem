const ITEM_ERROR_MSG = "errMsg";
const LOAD_ITEM_TYPE = 'loadItemType';
const LOAD_ALL_INVENTROY_ITEMS = 'loadAllInventoryItems';
const ADD_ITEM = 'addItem';
const DELETE_ITEM = 'deleteItem';
const ITEM_ACTION_TOGGLE = "itemActionToggle";

let inventoryInfo = {
	item_error_msg : '',
	allItems: [],
	allTypes: []
}

export default (state = {}, action) =>{
	
	switch (action.type){
		// case ITEM_ERROR_MSG: 
		// 	let invtInfoWithErr = JSON.parse(JSON.stringify(inventoryInfo));
		// 	invtInfoWithErr.item_error_msg = action.payload;
			
		// 	return invtInfoWithErr;
		// 	break;


		case LOAD_ALL_INVENTROY_ITEMS:
			
			inventoryInfo.allItems = action.payload;
			inventoryInfo.allItems.forEach(item=> item.EDIT_TOGGLE = false); 
		
			return {...inventoryInfo}
			break;

		case ADD_ITEM:
			inventoryInfo.allItems = action.payload;
			inventoryInfo.allItems.forEach(item=> item.EDIT_TOGGLE = false); 
			return {...inventoryInfo}
			break;

		case DELETE_ITEM:
			inventoryInfo.allItems = action.payload;
			inventoryInfo.allItems.forEach(item=> item.EDIT_TOGGLE = false); 
			return {...inventoryInfo}


		case LOAD_ITEM_TYPE: 
			inventoryInfo.allTypes = action.payload;
			
			return {...inventoryInfo}
			break;

		case ITEM_ACTION_TOGGLE:

			let invtInfo = JSON.parse(JSON.stringify(inventoryInfo));
			invtInfo.allItems.filter(item => {
				if(item.ID === action.payload) {
					item.EDIT_TOGGLE = true;
				}
			})
			
			return invtInfo;
			break;
		
		default:
			return {...state};
			
	}
}
