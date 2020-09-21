import React from 'react';
import AddItem from './addItem/addItem';

import './inventory.scss';

const inventory = (props) => {
  

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
          
        	{props.userInformation.account === 'RenDeInc'?
        		<AddItem/>:null
        	}
        </div>
    );
    
}



export default inventory;
