import axios from 'axios';

export const LOAD_ALL_INVENTROY_ITEMS = dispatch => {
	return (dispatch) => {
		axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/loadallinventoryitems`)
			.then(data => {
				if(data.data) {
					dispatch(
						{
							type:'loadAllInventoryItems',
					 		payload: data.data
					 	}
					);

				}
			})
	}
}



export const ITEM_ACTION_TOGGLE = ID => {

	return  {
			type: "itemActionToggle", 
			payload: ID
	}
}

