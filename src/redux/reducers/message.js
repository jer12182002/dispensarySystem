let LOAD_UNREAD_MESSAGE_NUMBER = "loadUnreadMessageNumber";
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
		case LOAD_UNREAD_MESSAGE_NUMBER:
			messageInfo.unreadMsgNumber = action.payload;
			return messageInfo;
			break;

		case LOAD_ALL_MESSAGES:
			messageInfo.messages = action.payload;
			let newMessageInfo = JSON.parse(JSON.stringify(messageInfo));
			newMessageInfo.allowScroll = false;
		
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
		return messageInfo;
		break;
	}

}