import {ADD_CLASS, REMOVE_CLASS} from './helperFunctions';


let orderPrinter = {
	displayRawGram: true,
	displayExtractGram: true,
	displayTotalGram: true,
	displayUnitPrice: true
}



export const UPDATE_PRINTING_TOGGLE = (printingType,targetAttribute, e) => {
	 orderPrinter[targetAttribute] = e.target.checked;
	
	let marginLeftForPrinting = (orderPrinter.displayRawGram? 0:1) + (orderPrinter.displayExtractGram? 0:1) + (orderPrinter.displayTotalGram? 0:1) + (orderPrinter.displayUnitPrice? 0:1);
	
	let target = printingType === "orderEditing"? document.querySelector(".orderEditing-wrapper .order-body"):document.querySelector(".orderReview-wrapper .order-body");
	console.log(printingType);
	REMOVE_CLASS(target, "marginLeftForPrinting-2");
	REMOVE_CLASS(target, "marginLeftForPrinting-4");
	REMOVE_CLASS(target, "marginLeftForPrinting-6");
	REMOVE_CLASS(target, "marginLeftForPrinting-8");

	switch (marginLeftForPrinting) {
		case 1:
			ADD_CLASS(target, "marginLeftForPrinting-2");
			break;
		case 2:
			ADD_CLASS(target, "marginLeftForPrinting-4");
			break;
		case 3:
			ADD_CLASS(target, "marginLeftForPrinting-6");
			break;
		case 4:
			ADD_CLASS(target, "marginLeftForPrinting-8");
			break;
	}	
	console.log(marginLeftForPrinting);

	return dispatch => {
		dispatch({
			type: "updateOrderPrinter", 
			payload: { orderPrinter: orderPrinter}	
		})
	}
}
