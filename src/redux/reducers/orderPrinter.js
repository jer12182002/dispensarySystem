const UPDATE_ORDER_PRINTER = "updateOrderPrinter";

let orderPrinter = {
	displayRawGram: true,
	displayExtractGram: true,
	displayTotalGram: true,
	displayUnitPrice: true
}


export default (state = {}, action)=>{
	switch (action.type) {
		case UPDATE_ORDER_PRINTER:
			orderPrinter = action.payload.orderPrinter;
		return JSON.parse(JSON.stringify(orderPrinter));
		break;

		default: 
		return JSON.parse(JSON.stringify(orderPrinter));
	
	}

}