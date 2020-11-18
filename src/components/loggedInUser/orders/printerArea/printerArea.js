import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './printerArea.scss';

import {PRINT_FUNCTION} from 'redux/actions/helperFunctions';
import {UPDATE_PRINTING_TOGGLE} from 'redux/actions/orderPrinterAreaAction';

class PrinterArea extends Component {
	
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
						<button>Print Label</button>
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
		displayUnitPrice: state.orderPrinter.displayUnitPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		UPDATE_PRINTING_TOGGLE : (printingType, targetAttr, e) => dispatch(UPDATE_PRINTING_TOGGLE(printingType,targetAttr, e))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrinterArea);
