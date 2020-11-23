let UPDATE_MESSAGE_INFO = "updateMessageInfo";

let messageInput = {
	author: "",
	recipient: "",
	message: ""
}


export default (state={}, action) => {
	switch(action.type) {
		case UPDATE_MESSAGE_INFO: 
			messageInput.author = action.payload;
			return messageInput;
			break;

	
			

		default:
		return state;
		break;
	}

}