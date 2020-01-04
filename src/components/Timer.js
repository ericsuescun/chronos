import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import TimerForm from './TimerForm';
import store from '../store';

class Timer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			title: props.title,
			project: props.project,
			value: props.value,
			status: props.status,
			edit: props.edit
		}
	}

	handleErase(index, e) {
		e.preventDefault();
		store.dispatch({ type: "ERASE", index: index });
	}

	handleEdit(index, e) {
		e.preventDefault();
		store.dispatch({ type: "EDIT", index: index });
	}
	
	render() {
		return(
			<div key={'id' + this.state.index}>
				<h5>{this.state.title}</h5>
				<p>{this.state.project}</p>
				<h1>{this.state.value}</h1>
				<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this, this.state.index) } />
				<FontAwesomeIcon icon="edit" onClick={this.handleEdit.bind(this, this.state.index)} />
				<p>{this.state.status ? 'running' : 'stopped' }</p>
			</div>
		);
	}
}

export default Timer;