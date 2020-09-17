import React, { Component, PropTypes } from 'react';
import './inventory.scss';

const inventory = (props) => {
  
	console.log(props.userInformation);
    return (
        <div className="inventory-wrapper">
        	<table>
        		<thead>
        			<tr>
        				<td>Index</td>
        				<td>Name</td>
        				<td>中文</td>
        				<td>Qty</td>
        				{props.userInformation.account === 'RenDeInc'?
        					<>
        					<td>Price</td>
        					<td>Action</td>
        					</>
        					:
        					null
        				}
        			</tr>
        		</thead>
        		<tbody>

        		</tbody>
        	</table>
        </div>
    );
    
}

export default inventory;
