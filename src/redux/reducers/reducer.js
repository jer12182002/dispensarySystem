import {combineReducers} from 'redux';
import allAccounts from './allAccounts';
import itemsControl from './itemsControl';
import errMsg from './errMsg';

const allReducers = combineReducers(
	{	
		accounts : allAccounts, 
		itemsControl: itemsControl,
		errMsg: errMsg
	}
)
export default allReducers;