import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import TimerForm from './TimerForm';
import store from '../store';
import { Button } from 'react-bootstrap';

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

	handleStartStop(index, e) {
		e.preventDefault();
		console.log('start! - stop! ');
		this.setState({ status: !this.state.status });
		if(!this.state.status) {
			this.myInterval = setInterval(() => {
				this.setState({ value: this.state.value + 1 })
			}, 1000);	
		} else {
			clearInterval(this.myInterval);
		}
		
		store.dispatch({ type: "STARTSTOP", index: index });
	}
	
	render() {
		return(
			<div key={'id' + this.state.index}>
				<h5>{this.state.title}</h5>
				<p>{this.state.project}</p>
				<h1>{this.state.value}</h1>
				<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this, this.state.index) } />
				<FontAwesomeIcon icon="edit" onClick={this.handleEdit.bind(this, this.state.index)} />
				{/*<FontAwesomeIcon icon="edit" onClick={this.handleStartStop.bind(this, this.state.index)} />*/}
				<Button variant={ this.state.status ? 'danger' : 'success' } onClick={this.handleStartStop.bind(this, this.state.index)} >{this.state.status ? 'Stop' : 'Start' }</Button>
				{/*<Button variant={ store.getState().timers[this.state.index].status ? 'primary' : 'success' } onClick={this.handleStartStop.bind(this, this.state.index)} >Start/Stop</Button>*/}
				<p>{this.state.status ? 'running' : 'stopped' }</p>
			</div>
		);
	}
}

export default Timer;