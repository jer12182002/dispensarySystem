import {combineReducers} from 'redux';
import allAccounts from './allAccounts';
import itemsControl from './itemsControl';


const allReducers = combineReducers(
	{	
		accounts : allAccounts, 
		itemsControl: itemsControl
	}
)
export default allReducers;