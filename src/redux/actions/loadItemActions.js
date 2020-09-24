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
			.catch(err => {
				dispatch ({
					type: 'errMsg', 
					payload: err.message
				})
			})
	}
}


export const ITEM_ACTION_TOGGLE = ID => {
	return  {
		type: "itemActionToggle", 
		payload: ID
	}
}





export const ITEM_DELETE = ID => {
	return dispatch => {
		axios.delete (`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/deleteitem`,{headers:{id:ID}})
		.then(data=> {
			if(data.status === 200) {
				dispatch({
					type:'deleteItem',
					payload:data.data.result[1]
				})
			}
			else {
				alert("Something wrong, delete command doesnt go throught database");
			}			
		})
		.catch(err => {
			dispatch ({
				type: 'errMsg', 
				payload: err.message
			})
		})
	}
}



