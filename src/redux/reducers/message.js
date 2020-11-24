let LOAD_ALL_MESSAGES = "loadAllMessages";
let UPDATE_MESSAGE_INFO = "updateMessageInfo";
let SENT_MESSAGE = "sentMessage";


let messageInfo = {
	messages: [],
	messageInput : {	
		author: "",
		recipient: "",
		message: ""
	}
}


export default (state={}, action) => {
	switch(action.type) {
		case LOAD_ALL_MESSAGES:
			messageInfo.messages = action.payload;
			return messageInfo;
			break;

		case UPDATE_MESSAGE_INFO: 
			messageInfo.messageInput = action.payload;
			return messageInfo;
			break;

		case SENT_MESSAGE:
			messageInfo.messages = action.payload;
			messageInfo.messageInput.message = "";
			return messageInfo;
			break;
			

		default:
		return state;
		break;
	}

}