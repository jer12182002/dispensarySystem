import React from 'react';
import './addItem.scss';

import {connect} from 'react-redux';

import {LOAD_ITEM_TYPE, ITEM_TYPE_IN, ADD_ITEM_KEYUP, ADD_BTN_CLICKED,SAVE_SUGGESTED_ITEM} from 'redux/actions/addItemAction';

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
                        <div key={key} className="suggestedItems" onClick = {e => {e.preventDefault(); this.props.SAVE_SUGGESTED_ITEM(item.ID);}}>{item.ENGLISH_NAME} {item.CHINESE_NAME}</div>
                    ):null
                }
                </div>
            	
                {this.props.itemTypes?
            	<div className="row">
            		<div className="input-container col-lg-11 col-12">
            			<div className="row">
                            <div className="col-lg-2 col-6">
    	            			<p>Name</p>
    	            			<input id="ADDITEM_ENGLISH_NAME" type="text" onChange={e=> {ITEM_TYPE_IN(e.target);this.props.ADD_ITEM_KEYUP();}}/>
                			</div>
                			<div className="col-lg-2 col-5">
                				<p>名稱</p>
                				<input id="ADDITEM_CHINESE_NAME" type="text" onChange={e=> {ITEM_TYPE_IN(e.target);this.props.ADD_ITEM_KEYUP();}}/>
                			</div>
                			<div className="col-lg-2 col-4">
                				<p>Type</p>
                				<select id="ADDITEM_TYPE" onChange={e=> ITEM_TYPE_IN(e.target)}>
                						<option></option>
                					{this.props.itemTypes.map(type=>
                						<option key= {type.ID}>{type.ITEM_TYPE}</option>
                					)}
                				</select>
                			</div>
                            <div className="col-lg-1 col-3">
                                <p>Ratio</p>
                                <input id="ADDITEM_RATIO" type="number" min="0" defaultValue="7" onChange={e=>ITEM_TYPE_IN(e.target)}/>
                            </div>

                			<div className="col-lg-1 col-3">
                				<p>Gram</p>
                				<input id="ADDITEM_QTY" type="number" min="0" onChange={e=> ITEM_TYPE_IN(e.target)}/>
                			</div>
                			<div className="col-lg-1 col-4">
                				<p>Stud. $</p>
                				<input id="ADDITEM_STD" type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN(e.target)}/>
                			</div>
                			<div className="col-lg-1 col-3">
                				<p>Prof. $</p>
                				<input id="ADDITEM_PROF" type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN(e.target)}/>
                			</div>
                			<div className="col-lg-1 col-3">
                				<p>RenDe $</p>
                				<input id="ADDITEM_RENDE" type="number" min="0" step="0.01" onChange={e=> ITEM_TYPE_IN(e.target)}/>
                			</div>
                        </div>
            		</div>
            		<div className="button-container col-lg-1 col-12">
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
