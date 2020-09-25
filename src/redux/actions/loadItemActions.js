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



export const SAVE_ITEM_CHANGE = (target, item_id) => {

	//GET SIBLING TAGS
	let itemContainer_tds = target.parentNode.parentNode.parentNode.children;  

	let item_englishName = itemContainer_tds[1].querySelector("input").value.trim().toLowerCase().replace(/\s\s/g, '').replace(/[^a-zA-Z0-9-]+(.)/g, (m, chr) => ' '+ chr.toUpperCase()).replace(/^[a-z]/g,c => c.toUpperCase());
	let item_chineseName = itemContainer_tds[2].querySelector("input").value.trim().split("").filter(char => /\p{Script=Han}/u.test(char)).join("");


	//PROCEED ONLY NAME IS VALID
	if(item_englishName + item_chineseName) {
		
		let editedItem = {
			ID: item_id,
			ENGLISH_NAME : item_englishName,
			CHINESE_NAME : item_chineseName,
			TYPE : itemContainer_tds[3].querySelector("select").value,
			QTY : itemContainer_tds[4].querySelector("input").value ? itemContainer_tds[4].querySelector("input").value : 0,
			RENDE_PRICE : itemContainer_tds[5].querySelector("input").value ? itemContainer_tds[5].querySelector("input").value : 0,
			STUDENT_PRICE : itemContainer_tds[6].querySelector("input").value ? itemContainer_tds[6].querySelector("input").value : 0, 
			PROFESSOR_PRICE : itemContainer_tds[7].querySelector("input").value ? itemContainer_tds[7].querySelector("input").value : 0
		}
		
		return dispatch => {
			axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/updateitem`,{updateItem:editedItem})
			.then(data=> {
				if(data.status === 200) {
					dispatch({
						type:'loadAllInventoryItems',
						payload:data.data.result[1]
					})
				}
				else {
					alert("Something wrong, update command doesnt go throught database");
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

}




export const ITEM_DELETE = ID => {
	return dispatch => {
		axios.delete (`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/deleteitem`,{headers:{id:ID}})
		.then(data=> {
			if(data.status === 200) {
				dispatch({
					type:'loadAllInventoryItems',
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



