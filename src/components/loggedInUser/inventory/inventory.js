import React from 'react';
import AddItem from './addItem/addItem';
import './inventory.scss';
import {connect} from 'react-redux';

import {LOAD_ALL_INVENTROY_ITEMS} from 'redux/actions/loadItemActions';

class inventory extends React.Component{
   
    componentDidMount() {
        const {LOAD_ALL_INVENTROY_ITEMS} = this.props;
        LOAD_ALL_INVENTROY_ITEMS();
    }

    render() {
        return (
            <div className="inventory-wrapper">
            	<table>
            		<thead>
            			<tr>
            				<td>Index</td>
            				<td>Name</td>
            				<td>中文</td>
            				<td>Qty</td>
            				{this.props.userInformation.account === 'RenDeInc'?
            					<>
            					<td>Rende Price</td>
                                <td>Student Price</td>
                                <td>Prof Price</td>
            					</>
            					:
            					null
            				}
            			</tr>
            		</thead>
            		<tbody>
                        {
                            this.props.allItems?
                            (this.props.allItems.map((item,key) => 
                                <tr key={item.ID}>
                                    <td> {key+1} </td>
                                    <td>{item.ENGLISH_NAME}</td>
                                    <td>{item.CHINESE_NAME}</td>
                                    <td>{item.QTY}</td>
                                    {this.props.userInformation.account === 'RenDeInc'?
                                        <>
                                        <td>{item.RENDE_PRICE}</td>
                                        <td>{item.STUDENT_PRICE}</td>
                                        <td>{item.PROFESSOR_PRICE}</td>
                                        </>
                                        :
                                        null
                                    }

                                </tr>
                            )):null
                        }
            		</tbody>
            	</table>
              
            	{
                    this.props.userInformation.account === 'RenDeInc'?
            		<AddItem/>:null
            	}
            </div>
        );
   }
}


const mapStateToProps = state => {
    return {
        allItems : state.itemsControl.allItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        LOAD_ALL_INVENTROY_ITEMS: ()=> {dispatch(LOAD_ALL_INVENTROY_ITEMS())}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(inventory);
