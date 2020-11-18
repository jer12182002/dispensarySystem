import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import moment from 'moment';
import './orderReview.scss';

import PrinterArea from 'components/loggedInUser/orders/printerArea/printerArea';

import * as orderDetailAction from 'redux/actions/orderDetailAction';

class orderReview extends Component {
	
	componentWillMount() {
		if(this.props.order_id) {
			this.props.LOAD_SAVED_ORDER(this.props.order_id)
		}else {
			this.props.LOAD_DEFAULT_SETTING();
		}
	}




	duplicateOrderFunction(account,orderId,orderStatus) {
		if(this.props.dupicatedOrderId) {
			return (
				<div className="duplicateFunction container-fluid">
					<div className="row">
						<div className="col-6"><h1>Order Number: {orderId}</h1></div>
						<div className="col-3">
							<button className="btn btn-success" onClick = {e => {e.preventDefault(); this.props.DUPLICATE_ORDER(orderId, account);}}>Duplicate</button>
						</div>
						<div className="col-3 align-right">
							<Link to={{pathname: "/orderediting", state:{order_id: this.props.dupicatedOrderId}}} className="btn btn-primary">Go To Duplicated Order: {this.props.dupicatedOrderId}</Link>
						</div>
					</div>
				</div>
			);
		}else {
			return (
				<div className="duplicateFunction container-fluid">
					<div className="row">
						<div className="col-6"><h1>Order Number: {orderId}</h1></div>
						<div className="col-6 align-right">
							<button className="btn btn-success" onClick = {e => {e.preventDefault(); this.props.DUPLICATE_ORDER(orderId, account);}}>Duplicate Order</button>
						</div>
					</div>
				</div>
			);	
		}
	}


 	orderListDisplay(account){
 		let DisplayTag ;
 
 			DisplayTag = 
 			<div className="order-form-container container-fluid">
 				<div className="order-header container-fluid">
	 				<div className="row">
	 					{account === "RenDeInc"?
		 					<img src="/assets/orderPictures/RenDe-logo.jpg"/>
		 					:
		 					<img src="/assets/orderPictures/CCTCM-logo.jpg"/>
	 					}
	 				</div>
	 				<div className="row">
	 					<div className="col-3">
	 						<h1>Date: {moment(this.props.date).format('YYYY-MM-DD')}</h1>
	 					</div>
	 					<div className="col-9">
	 						<h1>Customer: {this.props.customer}</h1>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-12">
		 					<h1>Address: {this.props.address}</h1>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-6">
		 					<h1>Phone: {this.props.phone}</h1>
	 					</div>
	 					<div className="col-6">
	 						<h1>Email: {this.props.email}</h1>	
	 					</div>
	 				</div>
 				</div>
 				<div className="order-body container-fluid">
					<div className="row formula_secton">
						<h1>Formula: {this.props.formula}</h1>
					</div>
 				{this.props.orderItemList?
 					<>
 					<div className="items_header row">
 						<div className="col-4"><p>Item:</p></div>
 						<div className={`col-2 ${this.props.displayRawGram? "":"no-print"} `}><p>Raw Gram(s):</p></div>
 						<div className={`col-2 ${this.props.displayExtractGram? "":"no-print"} `}><p>Extract Gram(s):</p></div>
 						<div className={`col-2 ${this.props.displayTotalGram? "":"no-print"} `}><p>Total Gram(s):</p></div>	
 						<div className={`col-2 ${this.props.displayUnitPrice? "":"no-print"} `}><p>Unit Price</p></div>
 					</div>

 					{this.props.orderItemList.map((item, key)=>
 						<div key={key} id={`item${item.ID}`} className="items_row row">
 							<div className="col-4">
 								<p>{item.ENGLISH_NAME} {item.CHINESE_NAME}</p>
 							</div>
 							<div className="col-8">
 								<div className="row">
	 								<div className={`col-3 ${this.props.displayRawGram? "":"no-print"} `}>
	 									<p>{(item.raw_gram*this.props.gramSum/this.props.defaultGramSum*this.props.dosagePerDay*this.props.dayPerSession).toFixed(2)}</p>	
	 								</div>
	 								<div className={`col-3 ${this.props.displayExtractGram? "":"no-print"} `}>
	 									<p>{(item.extract_gram).toFixed(2)}</p>
	 								</div>
	 								
	 								{(item.extract_gram*this.props.gramSum/this.props.defaultGramSum*this.props.dosagePerDay*this.props.dayPerSession).toFixed(2)>=item.QTY?
	 									<div className={`col-3 exceedQTY ${this.props.displayTotalGram? "":"no-print"} `}>
	 										<p>{(item.extract_gram*this.props.gramSum/this.props.defaultGramSum*this.props.dosagePerDay*this.props.dayPerSession).toFixed(2)} / In Stock: {item.QTY}</p>
	 									</div>
	 									:
	 									<div className={`col-3 ${this.props.displayTotalGram? "":"no-print"} `}>
	 										<p>{(item.extract_gram*this.props.gramSum/this.props.defaultGramSum*this.props.dosagePerDay*this.props.dayPerSession).toFixed(2)}</p>
	 									</div>
	 								}

	 								<div className={`col-3 ${this.props.displayUnitPrice? "":"no-print"} `}>
	 									<p>{(item.final_price*this.props.gramSum/this.props.defaultGramSum*this.props.dosagePerDay*this.props.dayPerSession).toFixed(2)}</p>
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

 		
 		return DisplayTag;
 	}


 	totalPriceDisplay (account) {
 		return (
 			<div className="price-display-container container-fluid">
 				<div className="container-fluid">
	 				<div className="row">
	 					<div className="col-12 col-lg-10"></div>
	 				</div>
	 						

	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Gram(s) Per Dosage: </p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>{this.props.gramSum}</p>
	 					</div>
	 				</div>
	 						

	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Dosage(s) Per Day:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>{this.props.dosagePerDay}</p>
	 					</div>
	 				</div>
	 					

	 				<div className="row border-bottom">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Day(s) Per Session:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>{this.props.dayPerSession}</p>
	 					</div>
	 				</div>
	 						

	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Order Total Gram(s):</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>{this.props.totalActualGram.toFixed(2)}</p>
	 					</div>
	 				</div>
	 					

	 				<div className="row border-bottom">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Order Sub Total:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>${this.props.totalOrderPrice.toFixed(2)}</p>
	 					</div>
	 				</div>

	 				<div className={`row text-red ${this.props.discountPrice > 0? '' : 'no-print'}`}>
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Discount(Price):</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>{this.props.discountPrice}</p>
	 					</div>
	 				</div>
	 						

	 				<div className={`row border-bottom text-red ${this.props.discountPercentage> 0? '' : 'no-print'}`}>
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Discount {this.props.discountPercentage} %:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>{(this.props.totalOrderPrice*this.props.discountPercentage/100).toFixed(2)}</p>
	 					</div>
	 				</div>
	 						

	 				<div className="row border-bottom">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Sub Toal:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>${(this.props.totalOrderPrice-this.props.discountPrice-this.props.totalOrderPrice*this.props.discountPercentage/100).toFixed(2)}</p>
	 					</div>
	 				</div>
	 				
	 				{account === 'Professor'?
		 				<div className="row">
		 					<div className="col-6 col-lg-10 align-right">
		 						<p>Dispensing Fee:$</p>
		 					</div>
		 					<div className="col-6 col-lg-2">
		 						<p>${this.props.dayPerSession*4}</p>
		 					</div>
		 				</div>
		 				:
		 				null
	 				}
	 						
	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Bottle Fee:$</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<p>{this.props.bottleFee}</p>
	 					</div>
	 				</div>
	 						
	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Tablet Fee:$</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
							<p>{this.props.tabletFee}</p>
	 					</div>
	 				</div>
	 					

	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Delivery Fee:$</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
							<p>{this.props.deliveryFee}</p>
	 					</div>
	 				</div>
	 					
	 				<div className="row border-bottom">
	 					{/*Discount should be applied before TAX !!!*/}
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Tax {this.props.tax} %:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						{account === 'Professor'?
		 						<p>${((this.props.totalOrderPrice-this.props.discountPrice-this.props.totalOrderPrice*this.props.discountPercentage/100+this.props.bottleFee+this.props.tabletFee+this.props.deliveryFee+this.props.dayPerSession*4)*this.props.tax/100).toFixed(2)}</p>
		 						:
		 						<p>${((this.props.totalOrderPrice-this.props.discountPrice-this.props.totalOrderPrice*this.props.discountPercentage/100+this.props.bottleFee+this.props.tabletFee+this.props.deliveryFee)*this.props.tax/100).toFixed(2)}</p>
	 						}
	 					</div>
	 				</div>
	 						
	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Total:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 					{account === 'Professor'?
	 						
	 						<p>${((this.props.totalOrderPrice-this.props.discountPrice-this.props.totalOrderPrice*this.props.discountPercentage/100+this.props.bottleFee+this.props.tabletFee+this.props.deliveryFee+this.props.dayPerSession*4)*(this.props.tax+100)/100).toFixed(2)}</p>
	 						:
	 						<p>${((this.props.totalOrderPrice-this.props.discountPrice-this.props.totalOrderPrice*this.props.discountPercentage/100+this.props.bottleFee+this.props.tabletFee+this.props.deliveryFee)*(this.props.tax+100)/100).toFixed(2)}</p>
	 					}
	 					</div>
	 				</div>
	 			</div>
 			</div>
 		);
 			
 	}



 	noteArea(){
 		return (
 			<div className={`note-container container-fluid ${this.props.orderNote? "" : "no-print"}`}>
                <div className="row">
                    <div className="col-12">
                        <h1>Note:</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <textarea value={this.props.orderNote} readonly="true"/>
                    </div>
                </div>
            </div>
        );
 	}


	

    render() {
        return (
            <div className="orderDetail-wrapper orderReview-wrapper">
            	{this.duplicateOrderFunction(this.props.orderAccount,this.props.orderId,this.props.orderStatus)}
    			{this.orderListDisplay(this.props.orderAccount)}
    			{this.totalPriceDisplay(this.props.userInformation.account)}
    			{this.noteArea()}
    			<PrinterArea printingType = {"orderEditing"}/>
            </div>
        );
    }
}


const mapStateToProps = state => {
	return {
		orderId: state.orderDetail.orderId,
		orderAccount: state.orderDetail.account,
		formula: state.orderDetail.formula,
		orderStatus : state.orderDetail.orderStatus,
		date: state.orderDetail.date,
		customer: state.orderDetail.customer,
		address: state.orderDetail.address,
		phone: state.orderDetail.phone,
		email: state.orderDetail.email,
		orderNote: state.orderDetail.orderNote,
		filteredItems: state.orderDetail.filteredItems,
		suggestedItem: state.orderDetail.suggestedItem,
		orderItemList: state.orderDetail.orderItemList, 
		defaultGramSum: parseFloat(state.orderDetail.defaultGramSum).toFixed(2),
		gramSum: state.orderDetail.gramSum,
		dosagePerDay: state.orderDetail.dosagePerDay,
		dayPerSession: state.orderDetail.dayPerSession, 
		totalActualGram: state.orderDetail.orderItemList? parseFloat((state.orderDetail.orderItemList.reduce((total, item)=> total + item.extract_gram,0)*state.orderDetail.gramSum/state.orderDetail.defaultGramSum*state.orderDetail.dosagePerDay*state.orderDetail.dayPerSession)):0,
		totalOrderPrice: state.orderDetail.orderItemList? parseFloat((state.orderDetail.orderItemList.reduce((total, item)=> total + item.final_price,0)*state.orderDetail.gramSum/state.orderDetail.defaultGramSum*state.orderDetail.dosagePerDay*state.orderDetail.dayPerSession)):0,
		discountPrice: parseFloat(state.orderDetail.discountPrice), 
		discountPercentage: parseFloat(state.orderDetail.discountPercentage), 
		bottleFee: parseFloat(state.orderDetail.bottleFee),
		tabletFee: parseFloat(state.orderDetail.tabletFee),
		deliveryFee: parseFloat(state.orderDetail.deliveryFee),
		tax: parseInt(state.orderDetail.tax),
		displayRawGram: state.orderPrinter.displayRawGram,
		displayExtractGram: state.orderPrinter.displayExtractGram,
		displayTotalGram: state.orderPrinter.displayTotalGram,
		displayUnitPrice: state.orderPrinter.displayUnitPrice,
		dupicatedOrderId: state.orderDetail.dupicatedOrderId
	}
}


const mapDispatchToProps = dispatch => {
  return { 
  	LOAD_SAVED_ORDER: orderId => dispatch(orderDetailAction.LOAD_SAVED_ORDER(orderId)),
  	DUPLICATE_ORDER: (orderId, account) => dispatch(orderDetailAction.DUPLICATE_ORDER(orderId, account))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(orderReview);

