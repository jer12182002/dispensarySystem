import axios from 'axios';

export const FILTER_ITEM_WHILE_TYPING = (value) => {
	let inputValue = value.trim();

	return (dispatch) => {
		axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/filteritemtyping`,{input : inputValue})
            .then(data => {
            	console.log(data.data.result);
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
}