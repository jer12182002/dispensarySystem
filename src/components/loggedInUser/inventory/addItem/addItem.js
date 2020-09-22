import React from 'react';
import './addItem.scss';

import {connect} from 'react-redux';

import {LOAD_ITEM_TYPE, ITEM_TYPE_IN, ADD_BTN_CLICKED, inputValue } from 'redux/actions/addItemAction';
import {LOAD_ALL_INVENTROY_ITEMS} from 'redux/actions/loadItemActions';

class addItem extends React.Component{
//greentea123
	componentDidMount() {
    	const {LOAD_ITEM_TYPE} = this.props;
		LOAD_ITEM_TYPE();
	}


    render() {
        return (
            <div className="addItem-wrapper container-fluid">git
            	<div className="row">zxc</div>
            	{this.props.itemTypes?
            	<div className="row">
            		<div className="input-container col-11">
            			<div>
	            			<p>Name</p>
	            			<input id="ADDITEM_ENGLISH_NAME" type="text" onChange={e=> ITEM_TYPE_IN('ENGLISH_NAME', e.target.value)}/>
            			</div>
            			<div>
            				<p>名稱</p>
            				<input id="ADDITEM_CHINESE_NAME" type="text" onChange={e=> ITEM_TYPE_IN('CHINESE_NAME', e.target.value)}/>
            			</div>
            			<div>
            				<p>Type</p>
            				<select id="ADDITEM_TYPE" onChange={e=> ITEM_TYPE_IN('TYPE', e.target.value)}>
            						<option></option>
            					{this.props.itemTypes.map(type=>
            						<option key= {type.ID}>{type.ITEM_TYPE}</option>
            					)}
            				</select>
            			</div>
            			<div>
            				<p>QTY</p>
            				<input type="number" min="0" onChange={e=> ITEM_TYPE_IN('QTY', e.target.value)}/>
            			</div>
            			<div>
            				<p>Studen $</p>
            				<input type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN('RENDE_PRICE', e.target.value)}/>
            			</div>
            			<div>
            				<p>Professor $</p>
            				<input type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN('STUDENT_PRICE', e.target.value)}/>
            			</div>
            			<div>
            				<p>Ren De $</p>
            				<input type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN('PROFESSOR_PRICE', e.target.value)}/>
            			</div>
            		</div>
            		<div className="button-container col-1">
            			<div>
            				<button type="button" className="btn btn-success" onClick={e => {e.preventDefault();ADD_BTN_CLICKED(); this.props.LOAD_ALL_INVENTROY_ITEMS() }}>Add</button>
            			</div>
            		</div>
            	</div>
            	:
            	null
            	}
            </div>
        );
    }
}


const mapStateToProps = state => {
	return {
		itemTypes:state.itemsControl.allTypes
	}
}


const mapDispatchToProps = dispatch => {
  return { 
    LOAD_ITEM_TYPE : () => dispatch(LOAD_ITEM_TYPE()),
    LOAD_ALL_INVENTROY_ITEMS : () => dispatch(LOAD_ALL_INVENTROY_ITEMS())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(addItem)
