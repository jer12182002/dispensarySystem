import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './neworder.scss';

import {SAVE_NEW_ORDER,
		SAVE_ORDER_DATE,
		SAVE_ORDER_CUSTOMER,
		SAVE_ORDER_ADDRESS,
		SAVE_ORDER_PHONE,
		SAVE_ORDER_EMAIL,
		SAVE_ORDER_STATUS,
		FILTER_ITEM_WHILE_TYPING,CLICKED_SUGGESTED_ITEM,ADJUST_GRAM_INPUT, ADD_NEW_ORDER_ITEM} from 'redux/actions/newOrderAction';


class neworder extends Component {
 	
	saveOrderFunction(account) {
		return (
		<div className="saveFunction container-fluid">
			<div className="row">
				<div className="col-6">
					<h1>Save as: </h1>
					<select onChange={e=>SAVE_ORDER_STATUS(e.target.value)}>
						<option value="receipt">Receipt</option>
						<option value="quote">Quote</option>
					</select>
				</div>
				<div className="col-6">
					<button className="btn btn-success" onClick={e=> {e.preventDefault(); SAVE_NEW_ORDER(account,this.props.orderItemList)}}>Save</button>
				</div>
			</div>
		</div>);
	}


 	orderListDisplay(account){
 		let DisplayTag ;
 		let today = moment().format('YYYY-MM-DD');

 		if(account === "RenDeInc") {
 			DisplayTag = 
 			<div className="order-form-container container-fluid">
 				<div className="order-header container-fluid">
	 				<div className="row">
	 					<img src="/assets/orderPictures/RenDe-logo.jpg"/>
	 				</div>
	 				<div className="row">
	 					<div className="col-3">
	 						<h1>Date:</h1>
	 						<input type="date" defaultValue={today} onChange={e=>this.props.SAVE_ORDER_DATE(e.target.value)}/>
	 					</div>
	 					<div className="col-9">
	 						<h1>Customer: </h1>
	 						<input type="text" onChange={e=>SAVE_ORDER_CUSTOMER(e.target.value)}/>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-12">
		 					<h1>Address: </h1>
		 					<input type="text" onChange={e=>SAVE_ORDER_ADDRESS(e.target.value)}/>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-6">
		 					<h1>Phone: </h1>
		 					<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={e=>SAVE_ORDER_PHONE(e.target.value)}/>
	 					</div>
	 					<div className="col-6">
	 						<h1>Email: </h1>	
		 					<input type="email" onChange={e=>SAVE_ORDER_EMAIL(e.target.value)}/>
	 					</div>
	 				</div>
 				</div>
 				<div className="order-body container-fluid">

 				</div>
 			</div>

 		}else if(account === "Professor"){

 		}else if(account === "Student") {

 		}

 		return DisplayTag;
 	}



 	addItemToOrder(account) {
 		
 		return (
 		<div className="addItem_function_bar container-fluid">
 			{(this.props.filteredItems && this.props.filteredItems.length > 0)?
	 			<div className="suggested_items_container">
	 				{this.props.filteredItems.map((item,key)=>
	 					<div key={key} className="row" onClick={(e)=>{e.preventDefault(); this.props.CLICKED_SUGGESTED_ITEM(item);}}>
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
								        switch (account) {
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
 			<div className="row">
 				<div id="newOrder_Item"className="col-4">
 					<p>Item:</p>
 					<input type="text" onChange={e=>this.props.FILTER_ITEM_WHILE_TYPING(e.target.value)}/>
 				</div>
 				<div id="newOrderItem_Raw" className="col-2">
 					<p>Raw Gram</p>
 					<input type="number" step="0.01" min="0" disabled onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('EXTRACT', e.target.value, this.props.suggestedItem.RATIO)}}/>
 				</div>
 				<div id="newOrderItem_Extract" className="col-2">
 					<p>Extract Gram</p>
 					<input type="number" step="0.01" min="0" disabled onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('RAW', e.target.value, this.props.suggestedItem.RATIO)}}/>
 				</div>
 				<div id="newOrderItem_Price" className="col-2">
 					<p>Price</p>
 					<input type="number" step="0.01" min="0" disabled onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('PRICE', e.target.value, this.props.suggestedItem.RATIO)}}/>
 				</div>
 				<div id="newOrderItem_Btn" className="col-1">
 					{this.props.suggestedItem?
 						<button className="btn btn-success" onClick={e=>{e.preventDefault();this.props.ADD_NEW_ORDER_ITEM(this.props.orderItemList);}}>Add</button>
 						:
 						null
 					}
 				</div>
 			</div>
 		</div>
 		);
 	}

    render() {
    	console.log(this.props.orderItemList);
        return (
            <div className="neworder-wrapper">
            	{this.saveOrderFunction(this.props.userInformation.account)}
    			{this.orderListDisplay(this.props.userInformation.account)}
    			{this.addItemToOrder(this.props.userInformation.account)}        	
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
  	SAVE_ORDER_DATE: account => dispatch(SAVE_ORDER_DATE(account)),
  	FILTER_ITEM_WHILE_TYPING: (value)=> dispatch(FILTER_ITEM_WHILE_TYPING(value)),
  	CLICKED_SUGGESTED_ITEM: (item) => dispatch(CLICKED_SUGGESTED_ITEM(item)),
  	ADD_NEW_ORDER_ITEM: orderItemList => dispatch(ADD_NEW_ORDER_ITEM(orderItemList))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(neworder);
