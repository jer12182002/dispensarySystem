import React from 'react';
import './addItem.scss';

import {connect} from 'react-redux';

//import {LOAD_ITEM_TYPE, ITEM_TYPE_IN, ADD_ITEM_KEYUP, ADD_BTN_CLICKED,SAVE_SUGGESTED_ITEM, CLEAR_BTN_CLICKED} from 'redux/actions/addItemAction';
import * as addItemActions from 'redux/actions/addItemAction';

class addItem extends React.Component{

	componentDidMount() {
    	const {LOAD_ITEM_TYPE} = this.props;
		LOAD_ITEM_TYPE();
	}


    render() {
        return (
            <div className="addItem-wrapper container-fluid">
                {this.props.itemSuggestions && this.props.itemSuggestions.length?
                    <div className="suggestedItems-container row">
                        {this.props.itemSuggestions.map((item,key)=>
                            <div key={key} id={`item${item.ID}`}className="suggestedItems" onClick = {e => {e.preventDefault(); this.props.SAVE_SUGGESTED_ITEM(item.ID);}}>{item.ENGLISH_NAME} {item.CHINESE_NAME}</div>
                            )}
                        {addItemActions.DYNAMIC_ADD_MARGIN_BOTTOM()}
                    </div>
                    :
                    null
                }

                {this.props.itemTypes?
            	<div className="row">
            		<div className="input-container col-lg-10 col-12">
            			<div className="row">
                            <div className="col-lg-2 col-6">
    	            			<p>Name</p>
    	            			<input id="ADDITEM_ENGLISH_NAME" type="text" onChange={e=> {addItemActions.ITEM_TYPE_IN(e.target);this.props.ADD_ITEM_KEYUP();}}/>
                			</div>
                			<div className="col-lg-2 col-5">
                				<p>名稱</p>
                				<input id="ADDITEM_CHINESE_NAME" type="text" onChange={e=> {addItemActions.ITEM_TYPE_IN(e.target);this.props.ADD_ITEM_KEYUP();}}/>
                			</div>
                			<div className="col-lg-2 col-4">
                				<p>Type</p>
                				<select id="ADDITEM_TYPE" onChange={e=> addItemActions.ITEM_TYPE_IN(e.target)}>
                						<option></option>
                					{this.props.itemTypes.map(type=>
                						<option key= {type.ID}>{type.ITEM_TYPE}</option>
                					)}
                				</select>
                			</div>
                            <div className="col-lg-1 col-3">
                                <p>Ratio</p>
                                <input id="ADDITEM_RATIO" type="number" min="0" defaultValue="7" onChange={e=>addItemActions.ITEM_TYPE_IN(e.target)}/>
                            </div>

                			<div className="col-lg-1 col-3">
                				<p>Gram</p>
                				<input id="ADDITEM_QTY" type="number" min="0" onChange={e=> addItemActions.ITEM_TYPE_IN(e.target)}/>
                			</div>
                			<div className="col-lg-1 col-4">
                				<p>Stud. $</p>
                				<input id="ADDITEM_STD" type="number" min="0" step="0.01" onChange={e=> addItemActions.ITEM_TYPE_IN(e.target)}/>
                			</div>
                			<div className="col-lg-1 col-3">
                				<p>Prof. $</p>
                				<input id="ADDITEM_PROF" type="number" min="0" step="0.01" onChange={e=> addItemActions.ITEM_TYPE_IN(e.target)}/>
                			</div>
                			<div className="col-lg-1 col-3">
                				<p>RenDe $</p>
                				<input id="ADDITEM_RENDE" type="number" min="0" step="0.01" onChange={e=> addItemActions.ITEM_TYPE_IN(e.target)}/>
                			</div>
                        </div>
            		</div>
            		<div className="button-container col-lg-2 col-12">
            			<div>
            				<button type="button" className="btn btn-success" onClick={e => {e.preventDefault();this.props.ADD_BTN_CLICKED(); }}>Add</button>
                            <button type="button" className="btn btn-warning" onClick={e => {e.preventDefault(); this.props.CLEAR_BTN_CLICKED();}}>Clear</button>
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
    LOAD_ITEM_TYPE : () => dispatch(addItemActions.LOAD_ITEM_TYPE()),
    ADD_ITEM_KEYUP: () => dispatch(addItemActions.ADD_ITEM_KEYUP()),
    ADD_BTN_CLICKED:() => dispatch(addItemActions.ADD_BTN_CLICKED()),
    CLEAR_BTN_CLICKED: ()=> dispatch(addItemActions.CLEAR_BTN_CLICKED()),
    SAVE_SUGGESTED_ITEM: (item_id)=> {dispatch(addItemActions.SAVE_SUGGESTED_ITEM(item_id))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(addItem)
