const UPDATE_ORDER_PRINTER = "updateOrderPrinter";
const RESET_PRINTING_TOGGLE_DEFAULT = "resetPrintingToggleDefault";

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

		case RESET_PRINTING_TOGGLE_DEFAULT:
			orderPrinter = {
				displayRawGram: true,
				displayExtractGram: true,
				displayTotalGram: true,
				displayUnitPrice: true				
			}
		return JSON.parse(JSON.stringify(orderPrinter));
		break;
		
		default: 
		return JSON.parse(JSON.stringify(orderPrinter));
	
	}

}