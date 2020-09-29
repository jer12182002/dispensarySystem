import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './neworder.scss';
import {LOAD_ITEM_TYPE, ITEM_TYPE_IN, ADD_ITEM_KEYUP, ADD_BTN_CLICKED,SAVE_SUGGESTED_ITEM} from 'redux/actions/addItemAction';
import {FILTER_ITEM_WHILE_TYPING} from 'redux/actions/newOrderAction';

class neworder extends Component {
 	
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
	 						<h1>Date: {today}</h1>
	 					</div>
	 					<div className="col-9">
	 						<h1>Customer: </h1><input type="text"/>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-12">
		 					<h1>Address: </h1>
		 					<input type="text"/>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-6">
		 					<h1>Phone: </h1>
		 					<input type="text"/>
	 					</div>
	 					<div className="col-6">
	 						<h1>Email: </h1>	
		 					<input type="text"/>
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



 	addItemToOrder() {
 		return (
 		<div className="addItem_function_bar container-fluid">
 			{this.props.filteredItems?
	 			<div className="row">
	 				{this.props.filteredItems.map((item,key)=>
	 					<>
	 					<div className="col-12">
	 						<p>{item.ENGLISH_NAME} {item.CHINESE_NAME}</p>
	 					</div>
	 					<div className="col-12 row">
	 						<div className="col-4">
	 							<p>Ration: {item.RATION}</p>
	 						</div>
	 						<div className="col-4">
	 							<p>QTY: {item.QTY} </p>
	 						</div>
								 						
	 						<div className="col-4">

	 						</div>
	 					</div>
	 					</>
	 					)}
	 			</div>
 			:null}
 			<div className="row">
 				<div className="col-4">
 					<p>Item:</p>
 					<input type="text" onChange={e=>this.props.FILTER_ITEM_WHILE_TYPING(e.target.value)}/>
 				</div>
 				<div className="col-3">
 					<p>Extract Gram</p>
 					<input type="number"/>
 				</div>
 				<div className="col-3">
 					<p>Raw Gram</p>
 					<input type="number"/>
 				</div>
 				<div className="col-2">
 					<button className="btn btn-primary">Add</button>
 				</div>
 			</div>
 		</div>
 		);
 	}

    render() {
    
        return (
            <div className="neworder-wrapper">
    			{this.orderListDisplay(this.props.userInformation.account)}
    			{this.addItemToOrder()}        	
            </div>
        );
    }
}


const mapStateToProps = state => {
	console.log(state);
	return {
		filteredItems: state.newOrder.filteredItems
	}
}


const mapDispatchToProps = dispatch => {
  return { 
  	FILTER_ITEM_WHILE_TYPING: (value)=> dispatch(FILTER_ITEM_WHILE_TYPING(value))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(neworder);
