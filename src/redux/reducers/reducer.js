import {combineReducers} from 'redux';
import allAccounts from './allAccounts';
import addItem from './addItem';


const allReducers = combineReducers(
	{	
		accounts : allAccounts, 
		addItem: addItem
	}
)
export default allReducers;