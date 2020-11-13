import axios from 'axios';
import {CLEAR_CHILDREN_INPUT_VALUE,SET_ATTRIBUTE} from './helperFunctions';
import {LOAD_ALL_INVENTROY_ITEMS} from './loadItemActions';


let inputValue = {
	ENGLISH_NAME : "",
	CHINESE_NAME : "",
	TYPE : "",
  RATIO: "7",
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


export const ITEM_TYPE_IN = (target) => {

  switch (target.id) {
    case 'ADDITEM_ENGLISH_NAME':
        inputValue.ENGLISH_NAME = target.value.trim().toLowerCase().replace(/\s\s/g, '').replace(/[^a-zA-Z0-9-]+(.)/g, (m, chr) => ' '+ chr.toUpperCase()).replace(/^[a-z]/g,c => c.toUpperCase());
    break;

    case 'ADDITEM_CHINESE_NAME':
        inputValue.CHINESE_NAME = target.value.trim().split("").filter(char => /\p{Script=Han}/u.test(char)).join("");
    break;

    case 'ADDITEM_TYPE':
        inputValue.TYPE = target.value;
    break;

    case 'ADDITEM_RATIO':
        inputValue.RATIO = target.value;
    break;

    case 'ADDITEM_QTY':
      inputValue.QTY = target.value;
    break;

    case 'ADDITEM_RENDE':
      inputValue.RENDE_PRICE = target.value;
    break;

    case 'ADDITEM_STD':
      inputValue.STUDENT_PRICE = target.value;
    break;

    case 'ADDITEM_PROF':
      inputValue.PROFESSOR_PRICE = target.value;
    break;
  }

  

}

export const ADD_BTN_CLICKED = dispatch => {

 if(inputValue.ENGLISH_NAME.trim() && 
     inputValue.CHINESE_NAME.trim() &&
     inputValue.TYPE.trim() &&
     inputValue.RATIO &&
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
                    alert(`Item ${inputValue.ENGLISH_NAME} ${inputValue.CHINESE_NAME} has been added successfully`);
                    CLEAR_INPUT();
                    dispatch({
                        type: 'loadAllInventoryItems', 
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
      alert("please type in valid input");
      
      return dispatch => ({
        type: 'errMsg', 
        payload: 'invalid input'
      })
    }
}


export const CLEAR_BTN_CLICKED = dispatch => {
    CLEAR_INPUT();
    return dispatch => {
        dispatch({
            type: 'addItemNamesInput', 
            payload: []  
        })
    }
}



export const ADD_ITEM_KEYUP = dispatch => {
    
    return dispatch => {
        if(inputValue.ENGLISH_NAME+inputValue.CHINESE_NAME) {
            axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/filteritemtyping`,{input : inputValue.ENGLISH_NAME+inputValue.CHINESE_NAME})
            .then(data => {
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
        }else {
            DYNAMIC_ADD_MARGIN_BOTTOM();

            dispatch({
                type: 'addItemNamesInput', 
                payload: []    
            })
        }

        
    }     
} 



export const SAVE_SUGGESTED_ITEM = (item_id) => {
    document.querySelector(`.inventory-wrapper #item${item_id}`).scrollIntoView({behavior: "smooth"});

    return {
        type: "suggestedItemClicked",
        payload: item_id
    }
}


//******************** Helper function ***************************
export const CLEAR_INPUT = () => {
  CLEAR_CHILDREN_INPUT_VALUE('.addItem-wrapper .input-container input');
  CLEAR_CHILDREN_INPUT_VALUE('.addItem-wrapper .input-container select');
  document.querySelector('.addItem-wrapper .input-container #ADDITEM_RATIO').value = 7;
  DYNAMIC_ADD_MARGIN_BOTTOM();
}


export const DYNAMIC_ADD_MARGIN_BOTTOM = () => {
  let addItemContainerHeight = document.querySelector('.inventory-wrapper .addItem-wrapper').offsetHeight;
  console.log(addItemContainerHeight);
  document.querySelector('.inventory-wrapper').style.marginBottom = `${addItemContainerHeight*2}px`;
}