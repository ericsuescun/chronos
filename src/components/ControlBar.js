import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import store from '../store';

class ControlBar extends Component {
	handleAdd(e) {
		e.preventDefault();
		store.dispatch({ type: 'ADD'});
	}

	render() {
		return(
			<div>
				<Button variant={"light"} onClick={this.handleAdd.bind(this) }>+</Button>
			</div>
		);
	}
}

export default ControlBar;