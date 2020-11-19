export const RESET_HEADER_PATH_DEFAULT = () => {
	return dispatch => {
		dispatch({
			type: "resetHeaderPathDeault", 
			payload: {
				pathName: undefined,
				pathUrl: undefined
			}
		})
	}
}


export const ASSIGN_HEADER_PATH = (pathName, pathUrl) => {
	return dispatch => {
		dispatch ({
			type: "setHeaderPath",
			payload: {
				pathName: pathName,
				pathUrl: pathUrl
			}
		})
	}
}