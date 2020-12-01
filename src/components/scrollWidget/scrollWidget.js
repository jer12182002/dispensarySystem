import React, { Component, PropTypes } from 'react';
import './scrollWidget.scss';

import * as HelperActions from 'redux/actions/helperFunctions';

class scrollWidget extends Component {

    render() {
        return (
            <div className="scrollWidget-container">
            	<div className="arrow-up" onClick={e => {e.preventDefault(); HelperActions.SCROLL_TO_TOP(this.props.scrollTarget);}}><p>Up</p></div>
            	<div className="arrow-down" onClick={e => {e.preventDefault(); HelperActions.SCROLL_TO_BOTTOM(this.props.scrollTarget);}}><p>Down</p></div>
            </div>
        );
    }
}

export default scrollWidget;
