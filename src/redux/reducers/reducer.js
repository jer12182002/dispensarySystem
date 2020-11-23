import {combineReducers} from 'redux';
import header from './header.js';
import allAccounts from './allAccounts';
import itemsControl from './itemsControl';
import allOrders from './allOrders';
import orderDetail from './orderDetail';
import orderPrinter from './orderPrinter';
import message from './message';
import errMsg from './errMsg';


const allReducers = combineReducers(
	{	
		header : header,
		accounts : allAccounts, 
		itemsControl: itemsControl,
		allOrders: allOrders,
		orderDetail: orderDetail,
		orderPrinter: orderPrinter,
		message: message,
		errMsg: errMsg
	}
)
export default allReducers;