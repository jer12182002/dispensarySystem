import React from 'react';
import './addItem.scss';

import {connect} from 'react-redux';

import {LOAD_ITEM_TYPE } from 'redux/actions/addItemAction';


class addItem extends React.Component{
//greentea123
	componentDidMount() {
    	const {LOAD_ITEM_TYPE } = this.props;
		LOAD_ITEM_TYPE();
	}


    render() {
    
        return (
            <div className="addItem-wrapper container-fluid">
            	<div className="row">zxc</div>
            	{this.props.itemTypes?
            	<div className="row">
            		<div className="input-container col-11">
            			<div>
	            			<p>Name</p>
	            			<input type="text"/>
            			</div>
            			<div>
            				<p>名稱</p>
            				<input type="text"/>
            			</div>
            			<div>
            				<p>Type</p>
            				<select>
            					{this.props.itemTypes.map(type=>
            						<option key= {type.ID}>{type.ITEM_TYPE}</option>
            					)}
            				</select>
            			</div>
            			<div>
            				<p>QTY</p>
            				<input type="number" min="0"/>
            			</div>
            			<div>
            				<p>Studen $</p>
            				<input type="number" min="0" step="0.01"/>
            			</div>
            			<div>
            				<p>Professor $</p>
            				<input type="number" min="0" step="0.01"/>
            			</div>
            			<div>
            				<p>Ren De $</p>
            				<input type="number" min="0" step="0.01"/>
            			</div>
            		</div>
            		<div className="button-container col-1">
            			<div>
            				<button type="button" className="btn btn-success" onClick={LOAD_ITEM_TYPE}>Add</button>
            			</div>
            		</div>
            	</div>
            	:
            	null
            	}
            </div>
        );
    }
}


const mapStateToProps = state => {
	
	return {
		itemTypes:state.addItem.item_type
	}
}


const mapDispatchToProps = dispatch => {
  return { 
    LOAD_ITEM_TYPE : () => dispatch(LOAD_ITEM_TYPE ())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(addItem)
