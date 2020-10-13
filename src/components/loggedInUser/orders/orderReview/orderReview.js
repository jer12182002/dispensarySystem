import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './orderReview.scss';
import {LOAD_REVIEW_ORDER} from 'redux/actions/orderReviewAction'

class orderReview extends Component {
	componentDidMount(){
		console.log(this.props);
		this.props.LOAD_REVIEW_ORDER (this.props.order_id);
	}

    render() {
    	
        return (
            <div className="orderReview-wrapper">
            	<div className="order-form-container container-fluid">
	 				<div className="order-header container-fluid">
		 				<div className="row">
		 					<img src="/assets/orderPictures/RenDe-logo.jpg"/>
		 				</div>
		 				<div className="row">
		 					<div className="col-3">
		 						<h1>Date: {moment(this.props.orderDetail.DATE).format("YYYY-MM-DD")}</h1>
		 					</div>
		 					<div className="col-9">
		 						<h1>Customer: {this.props.orderDetail.CUSTOMER}</h1>
		 						
		 					</div>
		 				</div>
		 				<div className="row">
		 					<div className="col-12">
			 					<h1>Address: {this.props.orderDetail.ADDRESS}</h1>
		 					</div>
		 				</div>
		 				<div className="row">
		 					<div className="col-6">
			 					<h1>Phone: {this.props.orderDetail.PHONE}</h1>
			 				
		 					</div>
		 					<div className="col-6">
		 						<h1>Email: {this.props.orderDetail.EMAIL}</h1>	
			 				
		 					</div>
		 				</div>
	 				</div>
	 				<div className="order-body container-fluid">
	 				{this.props.orderItemList?
	 					<>
	 					<div className="items_header row">
	 						<div className="col-6"><p>Item:</p></div>
	 						<div className="col-2"><p>Raw Gram:</p></div>
	 						<div className="col-2"><p>Extract Gram:</p></div>
	 						<div className="col-2"><p>Unit Price</p></div>
	 					</div>
	 					{this.props.orderItemList.map((item, key)=>
	 						<div key={key} className="items_row row">
	 							<div className="col-6">
	 							
	 							<p>{item.ENGLISH_NAME} {item.CHINESE_NAME}</p>
	 						
	 							</div>
	 							<div className="col-6">
	 								<div className="row">
		 								<div className="col-4">
		 									<p>{item.raw_gram}</p>	
		 								</div>
		 								<div className="col-4">
		 									<p>{item.extract_gram}</p>
		 								</div>
		 								<div className="col-4">
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
 				<div className="note-container container-fluid">
	                <div className="row">
	                    <div className="col-12">
	                        <h1>Note:</h1>
	                    </div>
	                </div>
	                <div className="row">
	                    <div className="col-12">
	                       <p>Build note section here...</p>
	                    </div>
	                </div>
	            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
	console.log(state);
	return {
		orderDetail: state.orderReview.orderDetail, 
		orderItemList: state.orderReview.orderItemList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		LOAD_REVIEW_ORDER: (order_id) => dispatch(LOAD_REVIEW_ORDER(order_id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(orderReview);
