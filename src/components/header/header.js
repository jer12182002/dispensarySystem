import React from 'react';
import './header.scss';
import {connect} from 'react-redux';

class header extends React.Component {

	render() {
		return (
			<header>
				<h1>Dispensary</h1>
				<h1>log out</h1>
			</header>
		);
	}
}

// function mapDispatchToProps(state) {
	
// 	return {users : state}

// }


export default header;
