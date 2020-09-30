import axios from 'axios';
	
export const FILTER_ITEM_WHILE_TYPING = (value) => {
	let inputValue = value.trim();

	return (dispatch) => {
		if(inputValue) {

			axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/filteritemtyping`,{input : inputValue})
	            .then(data => {
	                if(data.data.result) {
	                    dispatch({
	                        type: 'filteritemtyping', 
	                        payload: data.data.result     
	                    })
	                }
	            })
	            .catch(err => {
	                dispatch ({
	                    type: 'errMsgS', 
	                    payload: err.message
	                })
	            })    
	    }
	    else {
	    	dispatch({
	    		type: 'filteritemtyping', 
	            payload: []    
	    	})
	    }

	}
}


export const CLICKED_SUGGESTED_ITEM = (item) => {
	let newOrderItem_Extract = document.querySelector("#newOrderItem_Extract input");
	let newOrderItem_Gram = document.querySelector("#newOrderItem_Gram input");
	
	newOrderItem_Extract.removeAttribute("disabled");
	newOrderItem_Gram.removeAttribute("disabled");
	newOrderItem_Extract.value = item.RATIO;
	newOrderItem_Gram.value = 1;


	return {
		type: "filteritemtyping",
		payload:[]
	}
}



export const ADJUST_GRAM_INPUT = (target, value, ratio) => {

}