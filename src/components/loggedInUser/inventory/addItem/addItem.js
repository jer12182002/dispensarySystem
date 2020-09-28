import React from 'react';
import './addItem.scss';

import {connect} from 'react-redux';

import {LOAD_ITEM_TYPE, ITEM_TYPE_IN, ADD_ITEM_KEYUP, ADD_BTN_CLICKED,SAVE_SUGGESTED_ITEM} from 'redux/actions/addItemAction';
import {MOVE_SCREEN_TO_ITEM} from 'redux/actions/helperFunctions';

class addItem extends React.Component{
//greentea123
	componentDidMount() {
    	const {LOAD_ITEM_TYPE} = this.props;
		LOAD_ITEM_TYPE();
	}


    render() {
        return (
            <div className="addItem-wrapper container-fluid">
            	<div className="suggestedItems-container row">
                {this.props.itemSuggestions?
                    this.props.itemSuggestions.map((item,key)=> 
                        <div key={key} className="suggestedItems" onClick = {e => {e.preventDefault(); this.props.SAVE_SUGGESTED_ITEM(item.ID); MOVE_SCREEN_TO_ITEM(".suggestedItemClicked")}}>{item.ENGLISH_NAME} {item.CHINESE_NAME}</div>
                    ):null
                }
                </div>
            	
                {this.props.itemTypes?
            	<div className="row">
            		<div className="input-container col-11">
            			<div>
	            			<p>Name</p>
	            			<input id="ADDITEM_ENGLISH_NAME" type="text" onChange={e=> {ITEM_TYPE_IN(e.target);this.props.ADD_ITEM_KEYUP();}}/>
            			</div>
            			<div>
            				<p>名稱</p>
            				<input id="ADDITEM_CHINESE_NAME" type="text" onChange={e=> {ITEM_TYPE_IN(e.target);this.props.ADD_ITEM_KEYUP();}}/>
            			</div>
            			<div>
            				<p>Type</p>
            				<select id="ADDITEM_TYPE" onChange={e=> ITEM_TYPE_IN(e.target)}>
            						<option></option>
            					{this.props.itemTypes.map(type=>
            						<option key= {type.ID}>{type.ITEM_TYPE}</option>
            					)}
            				</select>
            			</div>
                        <div>
                            <p>Ratio</p>
                            <input id="ADDITEM_RATIO" type="number" min="0" defaultValue="7" onChange={e=>ITEM_TYPE_IN(e.target)}/>
                        </div>

            			<div>
            				<p>Gram</p>
            				<input id="ADDITEM_QTY" type="number" min="0" onChange={e=> ITEM_TYPE_IN(e.target)}/>
            			</div>
            			<div>
            				<p>Student $</p>
            				<input id="ADDITEM_STD" type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN(e.target)}/>
            			</div>
            			<div>
            				<p>Professor $</p>
            				<input id="ADDITEM_PROF" type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN(e.target)}/>
            			</div>
            			<div>
            				<p>Ren De $</p>
            				<input id="ADDITEM_RENDE" type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN(e.target)}/>
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
    ADD_ITEM_KEYUP: () => dispatch(ADD_ITEM_KEYUP()),
    ADD_BTN_CLICKED:() => dispatch(ADD_BTN_CLICKED()),
    SAVE_SUGGESTED_ITEM: (item_id)=> {dispatch(SAVE_SUGGESTED_ITEM(item_id))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(addItem)
