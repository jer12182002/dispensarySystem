import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './addItemToOrder.scss';

import {FILTER_ITEM_WHILE_TYPING,CLICKED_SUGGESTED_ITEM,ADJUST_GRAM_INPUT, ADD_NEW_ORDER_ITEM} from 'redux/actions/newOrderAction';


class addItemToOrder extends Component {
    
    render() {
    	console.log(this.props.orderItemList);
        return (
            <div className="addItem_function_bar container-fluid">
 			{(this.props.filteredItems && this.props.filteredItems.length > 0)?
	 			<div className="suggested_items_container">
	 				{this.props.filteredItems.map((item,key)=>
	 					<div key={key} className="row" onClick={(e)=>{e.preventDefault(); this.props.CLICKED_SUGGESTED_ITEM(item,this.props.orderItemList);}}>
		 					<div className="col-12">
		 						<p>{item.ENGLISH_NAME} {item.CHINESE_NAME} </p>
		 					</div>
	 						<div className="col-4">
	 							<p>Type: {item.TYPE}</p>
	 						</div>
	 						<div className="col-4">
	 							<p>Ratio: {item.RATIO}</p>
	 						</div>
	 						<div className="col-4">
	 							<p> Price:  
	 							  {(() => {
								        switch (this.props.account) {
								          case "RenDeInc":   return item.RENDE_PRICE;
								          case "Professor": return item.PROFESSOR_PRICE;
								          case "Student":  return item.STUDENT_PRICE;
								          default:      return "";
								        }
								      })()}	
	 							</p>
	 						</div>						
	 					</div>
	 					)}
	 			</div>
 			:<></>}
 			{this.props.suggestedItem?
 			<div className="row">
 				<div id="newOrder_Item"className="col-4">
 					<p>Item:</p>
 					<input type="text" onChange={e=>this.props.FILTER_ITEM_WHILE_TYPING(e.target.value)}/>
 				</div>
 				<div id="newOrderItem_Raw" className="col-2">
 					<p>Raw Gram</p>
 					<input type="number" step="0.01" min="0" defaultValue={this.props.suggestedItem.RATIO} onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('EXTRACT', e.target.value, this.props.suggestedItem, this.props.account)}}/>
 				</div>
 				<div id="newOrderItem_Extract" className="col-2">
 					<p>Extract Gram</p>
 					<input type="number" step="0.01" min="0" defaultValue="1" onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('RAW', e.target.value,  this.props.suggestedItem, this.props.account)}}/>
 				</div>
 				<div id="newOrderItem_Price" className="col-2">
 					<p>Price</p>
 					<input type="number" step="0.01" min="0" 
 						defaultValue={(() => 
 							{
							    switch (this.props.account) {
							        case "RenDeInc":   return this.props.suggestedItem.RENDE_PRICE;
							        case "Professor": return this.props.suggestedItem.PROFESSOR_PRICE;
							        case "Student":  return this.props.suggestedItem.STUDENT_PRICE;	          
							}
						})()}	 
						onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('PRICE', e.target.value,  this.props.suggestedItem, this.props.account)}}/>
 				</div>
 				<div id="newOrderItem_Btn" className="col-1">
 					<button className="btn btn-success" onClick={e=>{e.preventDefault();this.props.ADD_NEW_ORDER_ITEM(this.props.suggestedItem,this.props.orderItemList);}}>Add</button>
 				</div>
 			</div>
 			:
 			<div className="row">
 				<div id="newOrder_Item"className="col-4">
 					<p>Item:</p>
 					<input type="text" onChange={e=>{this.props.FILTER_ITEM_WHILE_TYPING(e.target.value);}}/>
 				</div>
 			</div>
 			}
 		</div>
        );
    }
}

const mapStateToProps = state => {
	return {
		filteredItems: state.newOrder.filteredItems,
		suggestedItem: state.newOrder.suggestedItem,
		orderItemList: state.newOrder.orderItemList
	}
}


const mapDispatchToProps = dispatch => {
  return { 
  	FILTER_ITEM_WHILE_TYPING: (value)=> dispatch(FILTER_ITEM_WHILE_TYPING(value,)),
  	CLICKED_SUGGESTED_ITEM: (item,orderItemList) => dispatch(CLICKED_SUGGESTED_ITEM(item,orderItemList)),
  	ADD_NEW_ORDER_ITEM: (suggestedItem,orderItemList) => dispatch(ADD_NEW_ORDER_ITEM(suggestedItem,orderItemList))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(addItemToOrder);
