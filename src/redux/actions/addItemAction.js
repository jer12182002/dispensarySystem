import axios from 'axios';

export let inputValue = {
	ENGLISH_NAME : "",
	CHINESE_NAME : "",
	TYPE : "",
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


export const ITEM_TYPE_IN = (target, value) => {

  switch (target) {
    case 'ENGLISH_NAME':
      inputValue.ENGLISH_NAME = value.trim().toLowerCase().replace(/\s\s/g, '').replace(/[^a-zA-Z0-9-]+(.)/g, (m, chr) => ' '+ chr.toUpperCase()).replace(/^[a-z]/g,c => c.toUpperCase());
    break;

    case 'CHINESE_NAME':
      inputValue.CHINESE_NAME = value.trim().split("").filter(char => /\p{Script=Han}/u.test(char)).join("");
    break;

    case 'TYPE':
      inputValue.TYPE = value;
    break;

    case 'QTY':
      inputValue.QTY = value;
    break;

    case 'RENDE_PRICE':
      inputValue.RENDE_PRICE = value;
    break;

    case 'STUDENT_PRICE':
      inputValue.STUDENT_PRICE = value;
    break;

    case 'PROFESSOR_PRICE':
      inputValue.PROFESSOR_PRICE = value;
    break;
  }
  console.log(inputValue);
}

export const ADD_BTN_CLICKED = () => {
  if(inputValue.ENGLISH_NAME.trim() && 
     inputValue.CHINESE_NAME.trim() &&
     inputValue.TYPE.trim() &&
     inputValue.QTY &&
     inputValue.RENDE_PRICE &&
     inputValue.STUDENT_PRICE &&
     inputValue.PROFESSOR_PRICE
     ) {
    
    
  }else {
    alert('Input Error !!!, please check if your input is valid');
  }
}

