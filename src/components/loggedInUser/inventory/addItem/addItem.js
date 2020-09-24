import React from 'react';
import './addItem.scss';

import {connect} from 'react-redux';

import {LOAD_ITEM_TYPE, ITEM_TYPE_IN, ADD_BTN_CLICKED, inputValue, ADD_ITEM_KEYUP} from 'redux/actions/addItemAction';


class addItem extends React.Component{
//greentea123
	componentDidMount() {
    	const {LOAD_ITEM_TYPE} = this.props;
		LOAD_ITEM_TYPE();
	}


    render() {
        console.log(this.props);
        return (
            <div className="addItem-wrapper container-fluid">
            	<div className="suggestedItems-container row">
                {this.props.itemSuggestions?
                    this.props.itemSuggestions.map((item,key)=> 
                        <div className="suggestedItems">{item.ENGLISH_NAME} {item.CHINESE_NAME}</div>
                    ):null
                }
                </div>
            	
                {this.props.itemTypes?
            	<div className="row">
            		<div className="input-container col-11">
            			<div>
	            			<p>Name</p>
	            			<input id="ADDITEM_ENGLISH_NAME" type="text" onChange={e=> {this.props.ADD_ITEM_KEYUP();ITEM_TYPE_IN('ENGLISH_NAME', e.target.value)}}/>
            			</div>
            			<div>
            				<p>名稱</p>
            				<input id="ADDITEM_CHINESE_NAME" type="text" onChange={e=> {this.props.ADD_ITEM_KEYUP();ITEM_TYPE_IN('CHINESE_NAME', e.target.value)}}/>
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
            				<button type="button" className="btn btn-success" onClick={e => {e.preventDefault();this.props.ADD_BTN_CLICKED(); }}>Add</button>
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
		itemTypes: state.itemsControl.allTypes,
        itemSuggestions: state.itemsControl.itemSuggestions
	}
}


const mapDispatchToProps = dispatch => {
  return { 
    LOAD_ITEM_TYPE : () => dispatch(LOAD_ITEM_TYPE()),
    ADD_BTN_CLICKED:() =>dispatch(ADD_BTN_CLICKED()),
    ADD_ITEM_KEYUP:()=>dispatch(ADD_ITEM_KEYUP())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(addItem)
