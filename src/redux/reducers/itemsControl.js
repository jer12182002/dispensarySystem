const LOAD_ITEM_TYPE = 'loadItemType';
const LOAD_ALL_INVENTROY_ITEMS = 'loadAllInventoryItems';

let inventoryInfo = {
	allItems: [],
	allTypes: []
}

export default (state = {}, action) =>{
	
	switch (action.type){
		case LOAD_ALL_INVENTROY_ITEMS:
			inventoryInfo.allItems = action.payload;
		
			return {...inventoryInfo}
			break;


		case LOAD_ITEM_TYPE: 
			inventoryInfo.allTypes = action.payload;
		
			return {...inventoryInfo}
			break;

	
		
		default:
			return {...state};
			
	}
}
