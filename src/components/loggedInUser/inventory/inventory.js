import React from 'react';
import AddItem from './addItem/addItem';
import './inventory.scss';
import {connect} from 'react-redux';

import {LOAD_ALL_INVENTROY_ITEMS,ITEM_ACTION_TOGGLE,SAVE_ITEM_CHANGE,ITEM_DELETE} from 'redux/actions/loadItemActions';

class inventory extends React.Component{
   INTERVALNAME = "LOAD_ITEMS";
    componentDidMount() {
        const {LOAD_ALL_INVENTROY_ITEMS} = this.props;
        LOAD_ALL_INVENTROY_ITEMS();
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
                        <><div className="md-hide item_list container-fluid">
                                <div className="item_list_header item_row row">
                                    <div className="item_cell col-lg-1">Index</div>
                                    <div className="col-lg-5">
                                        <div className="row">
                                            <div className="item_cell col-lg-6">Name</div>
                                            <div className="item_cell col-lg-6">中文</div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="row">
                                            <div className="item_cell col-lg-2">Type</div>
                                            <div className="item_cell col-lg-2">Ratio</div>
                                            <div className="item_cell col-lg-2">GRAM</div>
                                            <div className="item_cell col-lg-2">Rende Price</div>
                                            <div className="item_cell col-lg-2">Student Price</div>
                                            <div className="item_cell col-lg-2">Prof Price</div>
                                        </div>    
                                    </div>
                                    <div className="item_cell col-lg-1">Action</div>
                                </div>
                          
                                
                                {this.props.allItems.map((item, key)=>
                                <div className={`item_row row ${this.props.suggestedItemClicked === item.ID? "suggestedItemClicked" : ""}`} key = {item.ID}>
                                    <div className="item_cell_align_center item_cell col-lg-1"><span>Index:</span>{key+1}</div>

                                    <div className="col-lg-5">
                                        <div className="row">
                                            <div className="item_cell col-lg-6">
                                                <p><span>Name:</span>{item.ENGLISH_NAME}</p>
                                                 {item.EDIT_TOGGLE===true?
                                                    <input type="text" defaultValue={item.ENGLISH_NAME}/>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="item_cell col-lg-6">
                                                <p><span>名稱:</span>{item.CHINESE_NAME}</p>
                                                {item.EDIT_TOGGLE===true?
                                                    <input type="text" defaultValue={item.CHINESE_NAME}/>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="row">
                                            <div className="item_cell col-lg-2">
                                                <p><span>Type:</span>{item.TYPE}</p>
                                                {item.EDIT_TOGGLE===true?
                                                    <select defaultValue={item.TYPE}>
                                                        {this.props.itemTypes.map(type=>
                                                            <option key= {type.ID}>{type.ITEM_TYPE}</option>
                                                        )}
                                                    </select>
                                                    :
                                                    null
                                                }
                                            </div>
                                             <div className="item_cell col-lg-2">
                                                <p><span>Ratio:</span>{item.RATIO}</p>
                                                {item.EDIT_TOGGLE===true?
                                                    <input type="number" min="0" defaultValue={item.RATIO}/>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="item_cell col-lg-2">
                                                <p><span>Gram:</span>{item.QTY}</p>
                                                {item.EDIT_TOGGLE===true?
                                                    <input type="number" min="0" defaultValue={item.QTY}/>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="item_cell col-lg-2">
                                                <p><span>RenDe $:</span>{item.RENDE_PRICE}</p>
                                                {item.EDIT_TOGGLE===true?
                                                    <input type="number" min="0" step="0.01" defaultValue={item.RENDE_PRICE}/>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="item_cell col-lg-2">
                                                <p><span>Sutdent $:</span>{item.STUDENT_PRICE}</p>
                                                {item.EDIT_TOGGLE===true?
                                                    <input type="number" min="0" step="0.01" defaultValue={item.STUDENT_PRICE}/>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="item_cell col-lg-2">
                                                <p><span>Prof $:</span>{item.PROFESSOR_PRICE}</p>
                                                {item.EDIT_TOGGLE===true?
                                                    <input type="number" min="0" step="0.01" defaultValue={item.PROFESSOR_PRICE}/>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </div>    
                                    <div className="item_cell_align_center item_cell col-lg-1">
                                        {item.EDIT_TOGGLE===true?
                                            <div className="itemAction-container">
                                                <button className="btn btn-primary" onClick = {e => {e.preventDefault(); this.props.SAVE_ITEM_CHANGE(e.target, item.ID)}}>Save</button>
                                                <button className="btn btn-warning" onClick = {e => {e.preventDefault(); this.props.LOAD_ALL_INVENTROY_ITEMS();}}>Cancel</button>
                                                <button className="btn btn-danger" onClick={e=>{e.preventDefault();this.props.ITEM_DELETE(item.ID);}}>Delete</button>
                                            </div>
                                            :
                                            <button className="btn btn-success" onClick = {e => {e.preventDefault(); this.props.ITEM_ACTION_TOGGLE(item.ID);}}>Edit</button>
                                        }
                                    </div>
                                </div>)}
                        </div>
                        <AddItem/></>;


                }else if(this.props.userInformation.account ==='Student'){
                    returnTag =  
                        <div className="md-hide item_list container-fluid">
                            <div className="item_list_header item_row row">
                                <div className="item_cell col-lg-1">Index</div>
                                <div className="item_cell col-lg-3">Name</div>
                                <div className="item_cell col-lg-2">中文</div>
                                <div className="item_cell col-lg-2">Type</div>
                                <div className="item_cell col-lg-1">Ratio</div>
                                <div className="item_cell col-lg-1">GRAM</div>
                                <div className="item_cell col-lg-2">Student Price</div>
                            </div>
                            
                            {this.props.allItems.map((item, key)=>
                            <div className="item_row row" key = {item.ID}>
                                <div className="item_cell_align_center item_cell col-lg-1"><span>Index:</span>{key+1}</div>
                                <div className="item_cell col-lg-3"><p><span>Name:</span>{item.ENGLISH_NAME}</p></div>
                                <div className="item_cell col-lg-2"><p><span>名稱:</span>{item.CHINESE_NAME}</p></div>
                                <div className="item_cell col-lg-2"><p><span>Type:</span>{item.TYPE}</p></div>
                                <div className="item_cell col-lg-1"><p><span>Ratio:</span>{item.RATIO}</p></div>
                                <div className="item_cell col-lg-1"><p><span>Gram:</span>{item.QTY}</p></div>
                                <div className="item_cell col-lg-2"><p><span>Price:</span>{item.STUDENT_PRICE}</p></div>
                            </div>)}
                        </div>
                }else if(this.props.userInformation.account ==='Professor'){
                    returnTag =  
                        <div className="md-hide item_list container-fluid">
                            <div className="item_list_header item_row row">
                                <div className="item_cell col-lg-1">Index</div>
                                <div className="item_cell col-lg-3">Name</div>
                                <div className="item_cell col-lg-2">中文</div>
                                <div className="item_cell col-lg-2">Type</div>
                                <div className="item_cell col-lg-1">Ratio</div>
                                <div className="item_cell col-lg-1">GRAM</div>
                                <div className="item_cell col-lg-2">Professor Price</div>
                            </div>
                            
                            {this.props.allItems.map((item, key)=>
                            <div className="item_cell_align_center item_row row" key = {item.ID}>
                                <div className="item_cell col-lg-1"><span>Index:</span>{key+1}</div>
                                <div className="item_cell col-lg-3"><p><span>Name:</span>{item.ENGLISH_NAME}</p></div>
                                <div className="item_cell col-lg-2"><p><span>名稱:</span>{item.CHINESE_NAME}</p></div>
                                <div className="item_cell col-lg-2"><p><span>Type:</span>{item.TYPE}</p></div>
                                <div className="item_cell col-lg-1"><p><span>Ratio:</span>{item.RATIO}</p></div>
                                <div className="item_cell col-lg-1"><p><span>Gram:</span>{item.QTY}</p></div>
                                <div className="item_cell col-lg-2"><p><span>Price:</span>{item.PROFESSOR_PRICE}</p></div>
                            </div>)}
                        </div>

                }
            }
        }

        return returnTag;
    }


    render() {
        return (
            <div className="inventory-wrapper container-fluid">
                {this.displayInventoryItemList()}
            </div>
        );
   }
}


const mapStateToProps = state => {
    return {
        itemTypes : state.itemsControl.allTypes,
        allItems : state.itemsControl.allItems,
        suggestedItemClicked: state.itemsControl.suggestedItemClicked,
        errMsg: state.errMsg.errorMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        LOAD_ALL_INVENTROY_ITEMS: ()=> {dispatch(LOAD_ALL_INVENTROY_ITEMS())},
        ITEM_ACTION_TOGGLE:(id)=>{dispatch(ITEM_ACTION_TOGGLE(id))},
        SAVE_ITEM_CHANGE : (target, item) => {dispatch(SAVE_ITEM_CHANGE(target,item))},
        ITEM_DELETE: (id) => {dispatch(ITEM_DELETE(id));}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(inventory);
