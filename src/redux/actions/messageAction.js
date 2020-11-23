

let messageInput = {
	author: "",
	recipient: "",
	message: ""
}


export const SET_RECIPIENT = (account) => {

}



export const AUTHOR_INPUT = (value) => {
	messageInput.author = value.trim();

	return dispatch => {
		dispatch ({
			type: "updateMessageInfo", 
			payload: messageInput
		})
	}
}

export const RECIPIENT_INPUT = (value) => {
	messageInput.recipient = value.trim();

	return dispatch => {
		dispatch ({
			type: "updateMessage", 
			payload: messageInput
		})
	}
}

export const MESSAGE_INPUT = (value) => {
	messageInput.message = value.trim();

	return dispatch => {
		dispatch ({
			type: "updateMessage", 
			payload: messageInput
		})
	}
}