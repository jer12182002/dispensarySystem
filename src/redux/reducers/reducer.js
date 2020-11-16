import {combineReducers} from 'redux';
import allAccounts from './allAccounts';
import itemsControl from './itemsControl';
import allOrders from './allOrders';
import orderDetail from './orderDetail';
import orderPrinter from './orderPrinter';
import errMsg from './errMsg';


const allReducers = combineReducers(
	{	
		accounts : allAccounts, 
		itemsControl: itemsControl,
		allOrders: allOrders,
		orderDetail: orderDetail,
		orderPrinter: orderPrinter,
		errMsg: errMsg
	}
)
export default allReducers;