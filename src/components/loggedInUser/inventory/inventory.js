import React from 'react';
import AddItem from './addItem/addItem';
import './inventory.scss';
import {connect} from 'react-redux';

import {LOAD_ALL_INVENTROY_ITEMS,ITEM_ACTION_TOGGLE,ITEM_DELETE} from 'redux/actions/loadItemActions';

class inventory extends React.Component{
   INTERVALNAME = "LOAD_ITEMS";
    componentDidMount() {
        const {LOAD_ALL_INVENTROY_ITEMS} = this.props;
        LOAD_ALL_INVENTROY_ITEMS();
        console.log(this.props);
    }

    displayInventoryItemList () {
        const {LOAD_ALL_INVENTROY_ITEMS} = this.props;
        let returnTag;



        if(this.props.errMsg) {  // this will be true if there is error appearing while fetching data from database
            returnTag = <h1 className="errorMsg">{this.props.errMsg}</h1>
        }else {
            if(this.props.allItems) {      // make sure items have been loaded, so it will not show error in render()
                if(this.props.userInformation.account ==='RenDeInc') {
                    returnTag =
                        <><table>
                            <thead>
                                <tr>
                                    <td>Index</td>
                                    <td>Name</td>
                                    <td>中文</td>
                                    <td>Qty</td>
                                    <td>Rende Price</td>
                                    <td>Student Price</td>
                                    <td>Prof Price</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.allItems.map((item, key)=>
                                <tr key = {item.ID}>
                                    <td>{key+1} </td>
                                    <td>{item.ENGLISH_NAME}</td>
                                    <td>{item.CHINESE_NAME}</td>
                                    <td>{item.QTY}</td>
                                    <td>{item.RENDE_PRICE}</td>
                                    <td>{item.STUDENT_PRICE}</td>
                                    <td>{item.PROFESSOR_PRICE}</td>
                                    <td>
                                        {item.EDIT_TOGGLE===true?
                                            <div className="itemAction-container">
                                                <button className="btn btn-primary">Save</button>
                                                <button className="btn btn-warning" onClick = {e => {e.preventDefault(); this.props.LOAD_ALL_INVENTROY_ITEMS();}}>Cancel</button>
                                                <button className="btn btn-danger" onClick={e=>{e.preventDefault();this.props.ITEM_DELETE(item.ID);}}>Delete</button>
                                            </div>
                                            :
                                            <button className="btn btn-success" onClick = {e => {e.preventDefault(); this.props.ITEM_ACTION_TOGGLE(item.ID);}}>Edit</button>
                                        }
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                        <AddItem/></>;


                }else if(this.props.userInformation.account ==='Student'){
                    returnTag =  
                        <table>
                            <thead>
                                <tr>
                                    <td>Index</td>
                                    <td>Name</td>
                                    <td>中文</td>
                                    <td>Qty</td>
                                    <td>Student Price</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.allItems.map((item, key)=>
                                <tr key = {item.ID}>
                                    <td>{key+1} </td>
                                    <td>{item.ENGLISH_NAME}</td>
                                    <td>{item.CHINESE_NAME}</td>
                                    <td>{item.QTY}</td>
                                    <td>{item.STUDENT_PRICE}</td>
                                </tr>)}
                            </tbody>
                        </table>
                }else if(this.props.userInformation.account ==='Professor'){
                    returnTag =
                        <table>
                            <thead>
                                <tr>
                                    <td>Index</td>
                                    <td>Name</td>
                                    <td>中文</td>
                                    <td>Qty</td>
                                    <td>Prof Price</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.allItems.map((item, key)=>
                                <tr key = {item.ID}>
                                    <td>{key+1} </td>
                                    <td>{item.ENGLISH_NAME}</td>
                                    <td>{item.CHINESE_NAME}</td>
                                    <td>{item.QTY}</td>
                                    <td>{item.PROFESSOR_PRICE}</td>
                                </tr>)}
                            </tbody>
                        </table>;

                }
            }
        }

        return returnTag;
    }


    render() {
        return (
            <div className="inventory-wrapper">
                {this.displayInventoryItemList()}
            </div>
        );
   }
}


const mapStateToProps = state => {
    return {
        allItems : state.itemsControl.allItems,
        errMsg: state.errMsg.errorMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        LOAD_ALL_INVENTROY_ITEMS: ()=> {dispatch(LOAD_ALL_INVENTROY_ITEMS())},
        ITEM_ACTION_TOGGLE:(id)=>{dispatch(ITEM_ACTION_TOGGLE(id))},
        ITEM_DELETE: (id) => {dispatch(ITEM_DELETE(id));}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(inventory);
