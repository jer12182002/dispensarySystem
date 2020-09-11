import {combineReducers} from 'redux';
import allAccounts from './allAccounts';

const allReducers = combineReducers(
	{	
		accounts : allAccounts
	}
)

export default allReducers;