import axios from 'axios';
import {SCROLL_TO_BOTTOM} from './helperFunctions';


let messageInfo = {
	messages: [],
	messageInput : {	
		author: "",
		recipient: "",
		message: ""
	}
}



export const LOAD_ALL_MESSAGES = (account) => {
	return dispatch => {
		axios.get(`${process.env.REACT_APP_DISPENSARY_SERVER}/message/getallmessages?account_id=${account.id}`)
		.then(data => {
			if(data && data.status == 200) {
				dispatch ({
					type: "loadAllMessages", 
					payload: data.data
				})
			}

			SCROLL_TO_BOTTOM(".messages-container");
		})
	}
}




//******************************* Message - New message *****************************************
export const SET_RECIPIENTS = (account) => {
	let allRecipients = [
		{id: 1 , account: "Student"}, 
		{id: 2 , account: "Professor"},
		{id: 3 , account: "RenDeInc"}
	]

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