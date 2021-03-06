import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './printerArea.scss';

import {PRINT_FUNCTION} from 'redux/actions/helperFunctions';
import * as PrintingFunction from 'redux/actions/orderPrinterAreaAction';


class PrinterArea extends Component {

	componentDidMount() {
		this.props.RESET_PRINTING_TOGGLE_DEFAULT();
	}

    render() {
        return (
            <div className="print-container container-fluid no-print">
				<div className="row">
					<h1>Printer Filter</h1>
				</div>
				<div className="row">
					<div className="side-col-sm-12 col-6 col-lg-3">
						<p>Raw Gram(s)</p>
						<label className="switch">
							<input type="checkbox" checked={this.props.displayRawGram} onChange={e => this.props.UPDATE_PRINTING_TOGGLE(this.props.printingType,"displayRawGram",e)} />
							<div className="slider"></div>
      					</label>
      				</div>
					<div className="side-col-sm-12 col-6 col-lg-3">
						<p>Extract Gram(s)</p>
						<label className="switch">
							<input type="checkbox" checked={this.props.displayExtractGram} onChange={e => this.props.UPDATE_PRINTING_TOGGLE(this.props.printingType,"displayExtractGram",e)} />
							<div className="slider"></div>
      					</label>
					</div>
					<div className="side-col-sm-12 col-6 col-lg-3"><p>Total Gram(s)
						</p>
						<label className="switch">
							<input type="checkbox" checked = {this.props.displayTotalGram} onChange={e => this.props.UPDATE_PRINTING_TOGGLE(this.props.printingType,"displayTotalGram",e)} />
							<div className="slider"></div>
      					</label>
      				</div>
					<div className="side-col-sm-12 col-6 col-lg-3">
						<p>Unit Price</p>
						<label className="switch">
							<input type="checkbox" checked = {this.props.displayUnitPrice} onChange={e => this.props.UPDATE_PRINTING_TOGGLE(this.props.printingType,"displayUnitPrice",e)} />
							<div className="slider"></div>
      					</label>
      				</div>
				</div>
				<div className="row">
					<div className="col-6">
						<button onClick={e => PRINT_FUNCTION()}>Print Order</button>
					</div>
					<div className="col-6">
						<button onClick = {e => PrintingFunction.LABEL_PRITE_CLICKED(this.props.formula, this.props.orderDate, this.props.gramsQty, this.props.dosageQty, this.props.dayQty)}>Print Label</button>
					</div>
				</div>
			</div>
        );
    }
}


const mapStateToProps = state => {
	return {
		displayRawGram: state.orderPrinter.displayRawGram,
		displayExtractGram: state.orderPrinter.displayExtractGram,
		displayTotalGram: state.orderPrinter.displayTotalGram,
		displayUnitPrice: state.orderPrinter.displayUnitPrice,
		formula: state.orderDetail.formula, 
		orderDate: state.orderDetail.date,
		gramsQty: state.orderDetail.gramSum, 
		dosageQty: state.orderDetail.dosagePerDay,
		dayQty: state.orderDetail.dayPerSession

	}
}

const mapDispatchToProps = dispatch => {
	return {
		UPDATE_PRINTING_TOGGLE : (printingType, targetAttr, e) => dispatch(PrintingFunction.UPDATE_PRINTING_TOGGLE(printingType,targetAttr, e)),
		RESET_PRINTING_TOGGLE_DEFAULT: () => dispatch(PrintingFunction.RESET_PRINTING_TOGGLE_DEFAULT())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrinterArea);
