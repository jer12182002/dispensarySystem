import axios from 'axios';
import {CLEAR_CHILDREN_INPUT_VALUE} from './helperFunctions';
import {LOAD_ALL_INVENTROY_ITEMS} from './loadItemActions';


export let inputValue = {
	ENGLISH_NAME : "",
	CHINESE_NAME : "",
	TYPE : "",
	QTY : "",
	RENDE_PRICE : 0,
	STUDENT_PRICE : 0, 
	PROFESSOR_PRICE : 0
}





export const LOAD_ITEM_TYPE = (dispatch) => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/additem/loadtypelist`)  
    .then(res => {
      if(res.data) {
        dispatch(
          {
            type:'loadItemType',
            payload:res.data.result
          }
        );
      }
    }).catch(err=> {
      console.log(err)
    });
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
}

export const ADD_BTN_CLICKED = dispatch => {
  if(inputValue.ENGLISH_NAME.trim() && 
     inputValue.CHINESE_NAME.trim() &&
     inputValue.TYPE.trim() &&
     inputValue.QTY &&
     inputValue.RENDE_PRICE &&
     inputValue.STUDENT_PRICE &&
     inputValue.PROFESSOR_PRICE
     ) 
    {

        return dispatch => {
            axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/additem`,inputValue)
            .then(data => {
                if(data.data.result[1]) {
                    dispatch({
                        type: 'addItem', 
                        payload: data.data.result[1]       
                    })
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

    
  else {
    alert('Input Error !!!, please check if your input is valid');
  }
}


export const ADD_ITEM_KEYUP = dispatch => {
    return dispatch => {
         
          axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/inventory/additemkeyup`,{input : inputValue.ENGLISH_NAME+inputValue.CHINESE_NAME})
            .then(data => {
                console.log(data.data.result);
                if(data.data.result) {
                    dispatch({
                        type: 'addItemNamesInput', 
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