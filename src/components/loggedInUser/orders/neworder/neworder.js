import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './neworder.scss';

import {FILTER_ITEM_WHILE_TYPING,CLICKED_SUGGESTED_ITEM,ADJUST_GRAM_INPUT} from 'redux/actions/newOrderAction';

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
	 						<h1>Date:</h1>
	 						<input type="date" defaultValue={today}/>
	 					</div>
	 					<div className="col-9">
	 						<h1>Customer: </h1>
	 						<input type="text"/>
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
 				<div className="col-4">
 					<p>Item:</p>
 					<input type="text" onChange={e=>this.props.FILTER_ITEM_WHILE_TYPING(e.target.value)}/>
 				</div>
 				<div id="newOrderItem_Extract" className="col-3">
 					<p>Extract Gram</p>
 					<input type="number" step="0.01" min="0" disabled onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('EXTRACT', e.target.value, 'item.RATIO')}}/>
 				</div>
 				<div id="newOrderItem_Gram" className="col-3">
 					<p>Raw Gram</p>
 					<input type="number" step="0.01" min="0" disabled onChange={e=>{e.preventDefault(); ADJUST_GRAM_INPUT('RAW', e.target.value, 'item.RATIO')}}/>
 				</div>
 				<div className="col-1">
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
    			{this.addItemToOrder(this.props.userInformation.account)}        	
            </div>
        );
    }
}


const mapStateToProps = state => {
	return {
		filteredItems: state.newOrder.filteredItems
	}
}


const mapDispatchToProps = dispatch => {
  return { 
  	FILTER_ITEM_WHILE_TYPING: (value)=> dispatch(FILTER_ITEM_WHILE_TYPING(value)),
  	CLICKED_SUGGESTED_ITEM: (item) => dispatch(CLICKED_SUGGESTED_ITEM(item))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(neworder);
