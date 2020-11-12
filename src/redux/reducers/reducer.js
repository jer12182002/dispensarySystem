import {combineReducers} from 'redux';
import allAccounts from './allAccounts';
import itemsControl from './itemsControl';
import allOrders from './allOrders';
import orderEditing from './orderEditing';
import orderReview from './orderReview';
import orderPrinter from './orderPrinter';
import errMsg from './errMsg';


const allReducers = combineReducers(
	{	
		accounts : allAccounts, 
		itemsControl: itemsControl,
		allOrders: allOrders,
		orderEditing: orderEditing,
		orderReview: orderReview,
		orderPrinter: orderPrinter,
		errMsg: errMsg
	}
)
export default allReducers;