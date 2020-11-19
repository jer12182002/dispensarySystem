const RESET_HEADER_PATH_DEFAULT = "resetHeaderPathDeault";
const SET_HEADER_PATH = "setHeaderPath";

let headerLink = {
	pathName : undefined,
	pathUrl : undefined 
}

export default (state = headerLink, action) => {
	switch(action.type) {
		case RESET_HEADER_PATH_DEFAULT:
			
			return headerLink;
			break;

		case SET_HEADER_PATH:
			
			return JSON.parse(JSON.stringify(action.payload));
			break;

		default:
			
			return state;
			break;
	}
} 

