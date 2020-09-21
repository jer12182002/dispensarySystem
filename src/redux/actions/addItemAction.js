import axios from 'axios';

let inputValue = {
	ENGLISH_NAME : "",
	CHINESE_NAME : "",
	TPYE : "",
	QTY : "",
	RENDE_PRICE : 0,
	STUDENT_PRICE : 0, 
	PROFESSOR_PRICE : 0
}





const recivePosts =(receivedType, receivedPayload)=>{
  return {
    type: receivedType, 
    payload:receivedPayload
  }
}

export const LOAD_ITEM_TYPE = (dispatch) => {

  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/additem/loadtypelist`)  
    .then(data => {
      dispatch(recivePosts('loadItemType',data.data));
    })
  }
};



