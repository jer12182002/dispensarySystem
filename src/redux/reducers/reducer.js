import {combineReducers} from 'redux';
import allAccounts from './allAccounts';
import itemsControl from './itemsControl';
import newOrder from './newOrder';
import errMsg from './errMsg';


const allReducers = combineReducers(
	{	
		accounts : allAccounts, 
		itemsControl: itemsControl,
		newOrder: newOrder,
		errMsg: errMsg
	}
)
export default allReducers;