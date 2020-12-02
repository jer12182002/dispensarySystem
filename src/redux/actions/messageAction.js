import axios from 'axios';
import {SCROLL_TO_BOTTOM,SET_ATTRIBUTE} from './helperFunctions';



let messageInfo = {
	allowScroll: false,
	messages: [],
	messageInput : {	
		author: "",
		recipient: "",
		message: ""
	}
}

let allRecipients = [
	{id: 1 , account: "Student"}, 
	{id: 2 , account: "Professor"},
	{id: 3 , account: "RenDeInc"}
]




//********************** LoggedInUser - load unread message number ****************

export const LOAD_UNREAD_MSG_NUMBER = (account) => {
	return dispatch => {
		axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/message/getunreadmessagenumber?account_id=${account.id}`)
		.then(data => {
			if(data && data.data && data.data[0]) {
				dispatch({
					type : "loadUnreadMessageNumber",
					payload: data.data[0].UNREADNUMBER
				})
			}
		})
	}
}

//*********************** Message - all message **********************************

export const PARSE_ID_TO_ACCOUNT = id => {

	let account = ""
	allRecipients.forEach((recipient) => {
		if(recipient.id === id) {
			account = recipient.account;
		}
	})
	return account;
}



export const LOAD_ALL_MESSAGES = (account, prevMsgSize) => {
	return dispatch => {
		axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/message/getallmessages?account_id=${account.id}`)
		.then(data => {
			if(data && data.status == 200) {
				dispatch ({
					type: "loadAllMessages", 
					payload: data.data
				})
			}
			console.log(`${messageInfo.allowScroll}`);
			SCROLL_TO_BOTTOM_BY_CONDITION(prevMsgSize, data.data.length);
		})
		
	}
}



//******************************* Message - New message *****************************************
export const SET_RECIPIENTS = (account) => {

	let filteredRecipients = allRecipients.filter(recipient => recipient.id !== account.id);
	messageInfo.messageInput.recipients = filteredRecipients;
	messageInfo.messageInput.recipientId = filteredRecipients[0].id;
	
	if(messageInfo.messageInput.recipients.length) {

		return dispatch => {
			dispatch ({
				type: "updateMessageInfo", 
				payload: messageInfo.messageInput
			})
		}
	}else {
		return dispatch => {
			dispatch ({
				type: "messageError", 
				payload: ""
			})
		}
	}
}


export const AUTHOR_INPUT = (value) => {
	messageInfo.messageInput.author = value;

	return dispatch => {
		dispatch ({
			type: "updateMessageInfo", 
			payload: messageInfo.messageInput
		})
	}
}

export const RECIPIENT_INPUT = (value) => {
	messageInfo.messageInput.recipientId = value;

	return dispatch => {
		dispatch ({
			type: "updateMessage", 
			payload: messageInfo.messageInput
		})
	}
}

export const MESSAGE_INPUT = (value) => {
	messageInfo.messageInput.message = value;

	return dispatch => {
		dispatch ({
			type: "updateMessage", 
			payload: messageInfo.messageInput
		})
	}
}



export const SEND_MESSAGE_BTN_CLICKED = (authorId) => {

	let newMessageInput = JSON.parse(JSON.stringify(messageInfo.messageInput));
	newMessageInput.authorId = authorId;

	return dispatch => {

	axios.post(`${process.env.REACT_APP_DISPENSARY_SERVER}/message/send`,{newMessageInput:newMessageInput})
		.then(data => {

			if(data && data.status == 200) {
				
				dispatch ({
					type: "sentMessage",
					payload: data.data
				}) 
		
			}
			SCROLL_TO_BOTTOM(".messages-container");
		})
	}
	
}




//*********************** Message - helper function **********************************
export const CHANGE_ALLOW_SCROLL = () => {
	messageInfo.allowScroll = true;
}


export const SCROLL_TO_BOTTOM_BY_CONDITION = (prevMsgSize, currMsgSize) => {

	console.log(`curr:${currMsgSize}, prev: ${prevMsgSize} ${messageInfo.allowScroll}`);
	if(prevMsgSize && currMsgSize) {

		if(currMsgSize > prevMsgSize ) {
			DISPLAY_NEW_MESSAGE_NOTIFICATION();
		}
		
		if(messageInfo.allowScroll) {
			messageInfo.allowScroll = false;
			SCROLL_TO_BOTTOM(".messages-container");
		}
	}


}

const DISPLAY_NEW_MESSAGE_NOTIFICATION = () => {
	let newMsgContainer = document.querySelector(".newMessage-container");
	newMsgContainer.style.visibility = "visible";
	
	setTimeout(()=> {
		newMsgContainer.style.visibility = "hidden";
	},5000);
}
