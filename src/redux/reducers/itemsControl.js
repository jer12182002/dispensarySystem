const LOAD_ITEM_TYPE = 'loadItemType';
const LOAD_ALL_INVENTROY_ITEMS = 'loadAllInventoryItems';
const ITEM_ACTION_TOGGLE = "itemActionToggle";

let inventoryInfo = {
	allItems: [],
	allTypes: []
}

export default (state = {}, action) =>{
	
	switch (action.type){
		case LOAD_ALL_INVENTROY_ITEMS:
			inventoryInfo.allItems = action.payload;
			inventoryInfo.allItems.forEach(item=> item.EDIT_TOGGLE = false); 
		
			return {...inventoryInfo}
			break;


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
