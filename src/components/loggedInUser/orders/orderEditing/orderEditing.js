import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './orderEditing.scss';

import AddItemToOrder from './addItemToOrder/addItemToOrder';
import DoseDayFunction from './doseDayFunction/doseDayFunction';

import {LOAD_DEFAULT_SETTING,
		SAVE_NEW_ORDER,
		SAVE_ORDER_DATE,
		SAVE_ORDER_CUSTOMER,
		SAVE_ORDER_ADDRESS,
		SAVE_ORDER_PHONE,
		SAVE_ORDER_EMAIL,
		SAVE_ORDER_STATUS,
		SAVE_ORDER_NOTE,
		FILTER_ITEM_WHILE_TYPING,
		CLICKED_SUGGESTED_ITEM,
		ADJUST_GRAM_INPUT,
		ADD_NEW_ORDER_ITEM,
		REMOVE_NEW_ORDER_ITEM} from 'redux/actions/newOrderAction';


class orderEditing extends Component {
	
	componentDidMount() {
		this.props.LOAD_DEFAULT_SETTING();
	}



	saveOrderFunction(account, orderStatus) {

		return (
		orderStatus === "Quote"?
		<div className="saveFunction container-fluid">
			<div className="row">
				<div className="col-6">
					<h1>Save as: </h1>
					<select onChange={e=>SAVE_ORDER_STATUS(e.target.value)}>
						<option value="Receipt">Receipt</option>
						<option value="Quote">Quote</option>
					</select>
				</div>
				<div className="col-6">
					<button className="btn btn-success" onClick={e=> {e.preventDefault(); this.props.SAVE_NEW_ORDER(this.props.orderId,account,this.props.orderItemList)}}>Save</button>
				</div>
			</div>
		</div>
		:
		null 
		);
	}


 	orderListDisplay(account, orderStatus){
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
	 						<input type="date" defaultValue={today} onChange={e=>SAVE_ORDER_DATE(e.target.value)}/>
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
 				{this.props.orderItemList?
 					<>
 					<div className="items_header row">
 						<div className="col-4"><p>Item:</p></div>
 						<div className="col-2"><p>Raw Gram:</p></div>
 						<div className="col-2"><p>Extract Gram:</p></div>
 						<div className="col-2"><p>Actual Gram:</p></div>	
 						<div className="col-2"><p>Unit Price</p></div>
 					</div>
 					{this.props.orderItemList.map((item, key)=>
 						<div key={key} className="items_row row">
 							<div className="col-4">
 							{orderStatus === "Quote"?
 								<p><span className="remvoe-btn" onClick={e=> this.props.REMOVE_NEW_ORDER_ITEM(this.props.orderItemList, item.ID)}>X</span>{item.ENGLISH_NAME} {item.CHINESE_NAME}</p>
 								:
 								<p>{item.ENGLISH_NAME} {item.CHINESE_NAME}</p>
 							}
 							</div>
 							<div className="col-8">
 								<div className="row">
	 								<div className="col-3">
	 									<p>{item.raw_gram}</p>	
	 								</div>
	 								<div className="col-3">
	 									<p>{item.extract_gram}</p>
	 								</div>
	 								<div className="col-3">
	 									<p>{item.extract_gram}</p>
	 								</div>
	 								<div className="col-3">
	 									<p>{item.final_price}</p>
	 								</div>
 								</div>
 							</div>
 						</div>
 					)}
 					</>	
 				:
 				null

 				}
 				</div>
 			</div>

 		}else if(account === "Professor"){

 		}else if(account === "Student") {

 		}

 		return DisplayTag;
 	}


 	totalPriceDisplay (account) {
 		let returnTag = "";

 		switch(account) {
 			case 'RenDeInc':
 				return (
 					<div className="price-display-container container-fluid">
 						<div className="col-12 col-lg-3">
 							<div className="row">
 								<h1>Dosage Information:</h1>
 							</div>
 							<div className="row">
 								<input type="number" defaultValue="1"/><p>Gram(s) Per dose</p>
 							</div>
 							<div className="row">
 								<input type="number" defaultValue="1"/><p>Dosage(s) Per Day</p>
 							</div>
 							<div className="row">
 								<input type="number" defaultValue="1"/><p>Day(s) Per Session</p>
 							</div>
 						</div>
 						<div className="col-12 col-lg-9">
 							<div className="row">
 								<h1></h1>
 							</div>
 						</div>
 					</div>
 				);
 			break;
 			
 			deafult:
 			break;
 		}
 	}



 	noteArea(){
 		return (
 			<div className="note-container container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1>Note:</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <textarea onChange={e=> SAVE_ORDER_NOTE(e.target.value)}/>
                    </div>
                </div>
            </div>
        );
 	}


 	

    render() {
        return (
            <div className="neworder-wrapper">
            	{this.saveOrderFunction(this.props.userInformation.account, this.props.orderStatus)}
    			{this.orderListDisplay(this.props.userInformation.account, this.props.orderStatus)}
    			{this.totalPriceDisplay(this.props.userInformation.account)}
    			{this.noteArea()}
    			{this.props.orderStatus === "Receipt"?
    				null
    				:
    				<>
	    				<AddItemToOrder account={this.props.userInformation.account}/>    
	    				<DoseDayFunction account={this.props.userInformation.acount}/>    	
    				</>
    			}
            </div>
        );
    }
}


const mapStateToProps = state => {
	console.log(state);
	return {
		orderId: state.newOrder.orderId,
		orderStatus: state.newOrder.orderStatus,
		filteredItems: state.newOrder.filteredItems,
		suggestedItem: state.newOrder.suggestedItem,
		orderItemList: state.newOrder.orderItemList
	}
}


const mapDispatchToProps = dispatch => {
  return { 
  	LOAD_DEFAULT_SETTING: orderId => dispatch(LOAD_DEFAULT_SETTING(orderId)),
  	FILTER_ITEM_WHILE_TYPING: (value)=> dispatch(FILTER_ITEM_WHILE_TYPING(value)),
  	CLICKED_SUGGESTED_ITEM: (item) => dispatch(CLICKED_SUGGESTED_ITEM(item)),
  	ADD_NEW_ORDER_ITEM: orderItemList => dispatch(ADD_NEW_ORDER_ITEM(orderItemList)),
  	REMOVE_NEW_ORDER_ITEM: (orderItemList,itemId) => dispatch(REMOVE_NEW_ORDER_ITEM(orderItemList, itemId)),
  	SAVE_NEW_ORDER:(orderId, account, orderItemList) => dispatch(SAVE_NEW_ORDER(orderId, account, orderItemList))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(orderEditing);
