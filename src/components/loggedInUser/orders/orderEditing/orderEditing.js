import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import moment from 'moment';
import './orderEditing.scss';

import AddItemToOrder from './addItemToOrder/addItemToOrder';
import PrinterArea from 'components/loggedInUser/orders/printerArea/printerArea';

import * as orderDetailAction from 'redux/actions/orderDetailAction';

class orderEditing extends Component {
	
	componentDidMount() {
		if(this.props.order_id) {
			this.props.LOAD_SAVED_ORDER(this.props.order_id)
		}else {
			this.props.LOAD_DEFAULT_SETTING();
		}
	}



	saveOrderFunction(account, orderStatus) {
		if(this.props.orderItemList && this.props.orderItemList.length > 0) {
			if(orderStatus === "Quote") {
				return (
				<div className="saveFunction container-fluid no-print">
					<div className="row">
						<div className="col-4">
							<h1>Order Number: {this.props.orderId}</h1>
						</div>
						<div className="col-4">
							<h1>Save as: </h1>
							<select onChange={e=>this.props.SAVE_ORDER_STATUS(e.target.value)}>
								<option value="Quote">Quote</option>
								<option value="Receipt">Receipt</option>
							</select>
						</div>
						<div className="col-4">
							<button className="btn btn-success" onClick={e=> {e.preventDefault(); this.props.SAVE_ORDER_EDITING(this.props.orderId,account,this.props.orderItemList,this.props.gramSum)}}>Save</button>
						</div>
					</div>
				</div>);
			}else {
				return (<Redirect to={{pathname:"/orders/orderreview", state:{order_id: this.props.orderId}}}/>);
			}
		}
	}


 	orderListDisplay(account, orderStatus){
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
	 						<h1>Date:</h1>
	 						<input type="date" value = {moment(this.props.date).format('YYYY-MM-DD')} onChange={e=>this.props.SAVE_ORDER_DATE(moment(e.target.value).format('YYYY-MM-DD'))}/>
	 					</div>
	 					<div className="col-9">
	 						<h1>Customer: </h1>
	 						<input type="text" value = {this.props.customer} onChange={e=>this.props.SAVE_ORDER_CUSTOMER(e.target.value)}/>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-12">
		 					<h1>Address: </h1>
		 					<input type="text" value={this.props.address} onChange={e=>this.props.SAVE_ORDER_ADDRESS(e.target.value)}/>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-6">
		 					<h1>Phone: </h1>
		 					<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.props.phone} onChange={e=>this.props.SAVE_ORDER_PHONE(e.target.value)}/>
	 					</div>
	 					<div className="col-6">
	 						<h1>Email: </h1>	
		 					<input type="email" value={this.props.email} onChange={e=>this.props.SAVE_ORDER_EMAIL(e.target.value)}/>
	 					</div>
	 				</div>
 				</div>
 				<div className="order-body container-fluid">
					<div className="row formula_secton">
						<h1>Formula:  </h1>
						<input type="text" value = {this.props.formula} onChange = {e => this.props.SAVE_ORDER_FORMULA(e.target.value)}/>
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
 							{orderStatus === "Quote"?
 								<p><span className="remvoe-btn no-print" onClick={e=> this.props.REMOVE_ORDER_EDITING_ITEM(this.props.orderItemList, item.ID)}>X</span>{item.ENGLISH_NAME} {item.CHINESE_NAME}</p>
 								:
 								<p>{item.ENGLISH_NAME} {item.CHINESE_NAME}</p>
 							}
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
 		console.log(account);
 		return (
 			<div className="price-display-container container-fluid">
 				<div className="container-fluid">
	 				<div className="row">
	 					<div className="col-12 col-lg-10"></div>
	 					<div className="col-12 col-lg-2 align-right no-print">
	 						<button className="btn btn-success" onClick={e=>this.props.UPDATE_GRAM_SUM(this.props.defaultGramSum)}>Default : {parseFloat(this.props.defaultGramSum).toFixed(2)} </button>
	 					</div>
	 				</div>
	 						

	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Gram(s) Per Dosage:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<input type="number" value={this.props.gramSum} min="0" onChange={e=>this.props.GRAM_PER_DOSE_ON_CHANGE(e.target.value)}/>
	 					</div>
	 				</div>
	 						

	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Dosage(s) Per Day:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<input type="number" value={this.props.dosagePerDay} min="1" onChange={e => this.props.UPDATE_DOSAGE_PER_DAY(parseInt(e.target.value))}/>
	 					</div>
	 				</div>
	 					

	 				<div className="row border-bottom">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Day(s) Per Session:</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
	 						<input type="number" value={this.props.dayPerSession} min="1" onChange={e => this.props.UPDATE_DAY_PER_SESSION(parseInt(e.target.value))}/>
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
	 						<input type="number" className="text-red" value={this.props.discountPrice} min="0" onChange={e=>this.props.UPDATE_DISCOUNT_PRICE(e.target.value)} disabled={this.props.discountPercentage > 0}/>
	 					</div>
	 				</div>
	 						

	 				<div className={`row border-bottom text-red ${this.props.discountPercentage> 0? '' : 'no-print'}`}>
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Discount</p>
	 						<input type="number" className="text-red" value={this.props.discountPercentage} min="0" onChange={e=>this.props.UPDATE_DISCOUNT_PERCENTAGE(e.target.value)} disabled={this.props.discountPrice > 0}/>
	 						<p>%:</p>
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
	 						<input type="number" value={this.props.bottleFee} min="0" step=".01" onChange={e=>this.props.UPDATE_BOTTLE_FEE(e.target.value)}/>
	 					</div>
	 				</div>
	 						
	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Tablet Fee:$</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
							<input type="number" value={this.props.tabletFee} min="0" onChange={e=>this.props.UPDATE_TABLET_FEE(e.target.value)}/>
	 					</div>
	 				</div>
	 					

	 				<div className="row">
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Delivery Fee:$</p>
	 					</div>
	 					<div className="col-6 col-lg-2">
							<input type="number" value={this.props.deliveryFee} min="0" onChange={e=>this.props.UPDATE_DELIVERY_FEE(e.target.value)}/>
	 					</div>
	 				</div>
	 					
	 				<div className="row border-bottom">
	 					{/*Discount should be applied before TAX !!!*/}
	 					<div className="col-6 col-lg-10 align-right">
	 						<p>Tax</p>
	 						<input type="number" value={this.props.tax} min="0" onChange={e=>this.props.UPDATE_TAX(e.target.value)}/>
	 						<p>%:</p>
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
                        <textarea value={this.props.orderNote} onChange={e=> this.props.SAVE_ORDER_NOTE(e.target.value)}/>
                    </div>
                </div>
            </div>
        );
 	}


	printArea() {/*
		return (
			<div className="print-container container-fluid no-print">
				<div className="row">
					<h1>Printer Filter</h1>
				</div>
				<div className="row">
					<div className="side-col-sm-12 col-6 col-lg-3">
						<p>Raw Gram(s)</p>
						<label className="switch">
							<input type="checkbox" checked={this.props.displayRawGram} onChange={e => this.props.UPDATE_PRINTING_TOGGLE("displayRawGram",e)} />
							<div className="slider"></div>
      					</label>
      				</div>
					<div className="side-col-sm-12 col-6 col-lg-3">
						<p>Extract Gram(s)</p>
						<label className="switch">
							<input type="checkbox" checked={this.props.displayExtractGram} onChange={e => this.props.UPDATE_PRINTING_TOGGLE("displayExtractGram",e)} />
							<div className="slider"></div>
      					</label>
					</div>
					<div className="side-col-sm-12 col-6 col-lg-3"><p>Total Gram(s)
						</p>
						<label className="switch">
							<input type="checkbox" checked = {this.props.displayTotalGram} onChange={e => this.props.UPDATE_PRINTING_TOGGLE("displayTotalGram",e)} />
							<div className="slider"></div>
      					</label>
      				</div>
					<div className="side-col-sm-12 col-6 col-lg-3">
						<p>Unit Price</p>
						<label className="switch">
							<input type="checkbox" checked = {this.props.displayUnitPrice} onChange={e => this.props.UPDATE_PRINTING_TOGGLE("displayUnitPrice",e)} />
							<div className="slider"></div>
      					</label>
      				</div>
				</div>
				<div className="row">
					<div className="col-6">
						<button onClick={e => PRINT_FUNCTION()}>Print Order</button>
					</div>
					<div className="col-6">
						<button>Print Label</button>
					</div>
				</div>
			</div>
		);
		*/
	} 	

    render() {
    	console.log(this.props.displayRawGram);
        return (
            <div className="orderEditing-wrapper">
            	{this.saveOrderFunction(this.props.userInformation.account, this.props.orderStatus)}
    			{this.orderListDisplay(this.props.userInformation.account, this.props.orderStatus)}
    			{this.totalPriceDisplay(this.props.userInformation.account)}
    			{this.noteArea()}
    			<PrinterArea printingType = {"orderEditing"}/>
	    		<AddItemToOrder account={this.props.userInformation.account}/>    
            </div>
        );
    }
}


const mapStateToProps = state => {
	return {
		orderId: state.orderEditing.orderId,
		formula: state.orderEditing.formula,
		orderStatus: state.orderEditing.orderStatus,
		date: state.orderEditing.date,
		customer: state.orderEditing.customer,
		address: state.orderEditing.address,
		phone: state.orderEditing.phone,
		email: state.orderEditing.email,
		orderNote: state.orderEditing.orderNote,
		filteredItems: state.orderEditing.filteredItems,
		suggestedItem: state.orderEditing.suggestedItem,
		orderItemList: state.orderEditing.orderItemList, 
		defaultGramSum: parseFloat(state.orderEditing.defaultGramSum).toFixed(2),
		gramSum: state.orderEditing.gramSum,
		dosagePerDay: state.orderEditing.dosagePerDay,
		dayPerSession: state.orderEditing.dayPerSession, 
		totalActualGram: state.orderEditing.orderItemList? parseFloat((state.orderEditing.orderItemList.reduce((total, item)=> total + item.extract_gram,0)*state.orderEditing.gramSum/state.orderEditing.defaultGramSum*state.orderEditing.dosagePerDay*state.orderEditing.dayPerSession)):0,
		totalOrderPrice: state.orderEditing.orderItemList? parseFloat((state.orderEditing.orderItemList.reduce((total, item)=> total + item.final_price,0)*state.orderEditing.gramSum/state.orderEditing.defaultGramSum*state.orderEditing.dosagePerDay*state.orderEditing.dayPerSession)):0,
		discountPrice: parseFloat(state.orderEditing.discountPrice), 
		discountPercentage: parseFloat(state.orderEditing.discountPercentage), 
		bottleFee: parseFloat(state.orderEditing.bottleFee),
		tabletFee: parseFloat(state.orderEditing.tabletFee),
		deliveryFee: parseFloat(state.orderEditing.deliveryFee),
		tax: parseInt(state.orderEditing.tax),
		displayRawGram: state.orderPrinter.displayRawGram,
		displayExtractGram: state.orderPrinter.displayExtractGram,
		displayTotalGram: state.orderPrinter.displayTotalGram,
		displayUnitPrice: state.orderPrinter.displayUnitPrice
	}
}


const mapDispatchToProps = dispatch => {
  return { 
  	LOAD_SAVED_ORDER: orderId => dispatch(orderDetailAction.LOAD_SAVED_ORDER(orderId)),
  	LOAD_DEFAULT_SETTING: orderId => dispatch(orderDetailAction.LOAD_DEFAULT_SETTING(orderId)),
  	FILTER_ITEM_WHILE_TYPING: value=> dispatch(orderDetailAction.FILTER_ITEM_WHILE_TYPING(value)),
  	CLICKED_SUGGESTED_ITEM: item => dispatch(orderDetailAction.CLICKED_SUGGESTED_ITEM(item)),
  	ADD_ORDER_EDITING_ITEM: orderItemList => dispatch(orderDetailAction.ADD_ORDER_EDITING_ITEM(orderItemList)),
  	REMOVE_ORDER_EDITING_ITEM: (orderItemList,itemId) => dispatch(orderDetailAction.REMOVE_ORDER_EDITING_ITEM(orderItemList, itemId)),
  	SAVE_ORDER_STATUS: newStatus => dispatch(orderDetailAction.SAVE_ORDER_STATUS(newStatus)),
  	SAVE_ORDER_EDITING:(orderId, account, orderItemList,totalGram) => dispatch(orderDetailAction.SAVE_ORDER_EDITING(orderId, account, orderItemList,totalGram)),
  	SAVE_ORDER_DATE: newDate => dispatch (orderDetailAction.SAVE_ORDER_DATE(newDate)),
  	SAVE_ORDER_CUSTOMER: newCustomer => dispatch (orderDetailAction.SAVE_ORDER_CUSTOMER(newCustomer)),
  	SAVE_ORDER_ADDRESS: newAddress => dispatch(orderDetailAction.SAVE_ORDER_ADDRESS(newAddress)),
  	SAVE_ORDER_PHONE: newPhone => dispatch(orderDetailAction.SAVE_ORDER_PHONE(newPhone)),
  	SAVE_ORDER_EMAIL: newEmail => dispatch(orderDetailAction.SAVE_ORDER_EMAIL(newEmail)),
  	SAVE_ORDER_FORMULA: newFormula => dispatch(orderDetailAction.SAVE_ORDER_FORMULA(newFormula)),
  	SAVE_ORDER_NOTE: newNote => dispatch(orderDetailAction.SAVE_ORDER_NOTE(newNote)),
  	GRAM_PER_DOSE_ON_CHANGE: newGramSum => dispatch(orderDetailAction.GRAM_PER_DOSE_ON_CHANGE(newGramSum)), 
  	UPDATE_GRAM_SUM: defaultGramSum => dispatch(orderDetailAction.UPDATE_GRAM_SUM(defaultGramSum)),
  	UPDATE_DOSAGE_PER_DAY: newDosagePerDay => dispatch(orderDetailAction.UPDATE_DOSAGE_PER_DAY(newDosagePerDay)),
  	UPDATE_DAY_PER_SESSION: newDayPerSession => dispatch(orderDetailAction.UPDATE_DAY_PER_SESSION(newDayPerSession)),
	UPDATE_DISCOUNT_PRICE: newDiscountPrice => dispatch (orderDetailAction.UPDATE_DISCOUNT_PRICE(newDiscountPrice)),
	UPDATE_DISCOUNT_PERCENTAGE: newDiscountPercentage => dispatch(orderDetailAction.UPDATE_DISCOUNT_PERCENTAGE(newDiscountPercentage)),
  	UPDATE_BOTTLE_FEE: newBottleFee => dispatch(orderDetailAction.UPDATE_BOTTLE_FEE(newBottleFee)), 
	UPDATE_TABLET_FEE: newTabletFee => dispatch(orderDetailAction.UPDATE_TABLET_FEE(newTabletFee)), 
	UPDATE_DELIVERY_FEE: newDelievryFee => dispatch(orderDetailAction.UPDATE_DELIVERY_FEE(newDelievryFee)),
	UPDATE_TAX: newTax => dispatch(orderDetailAction.UPDATE_TAX(newTax))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(orderEditing);

