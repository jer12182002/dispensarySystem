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

