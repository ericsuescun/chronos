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
				this.setState({ value: this.state.value + 50 })
			}, 50);	
		} else {
			clearInterval(this.myInterval);
		}
		
		store.dispatch({ type: "STARTSTOP", index: index, value: this.state.value });
	}
	
	render() {
		return(
			<div key={'id' + this.state.index}>
				<h5>{this.state.title}</h5>
				<p>{this.state.project}</p>
				<h1>{secondsToHuman(this.state.value)}</h1>
				<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this, this.state.index) } />
				<FontAwesomeIcon icon="edit" onClick={this.handleEdit.bind(this, this.state.index)} />
				<Button variant={ this.state.status ? 'danger' : 'success' } onClick={this.handleStartStop.bind(this, this.state.index)} >{this.state.status ? 'Stop' : 'Start' }</Button>
				<p>{this.state.status ? 'running' : 'stopped' }</p>
			</div>
		);
	}
}

function secondsToHuman(s) {
	const seconds = Math.floor((s / 1000) % 60);
	const minutes = Math.floor(((s / 1000) / 60) % 60);
	const hours = Math.floor((s / 1000) / 60 / 60);

	const humanized = [
		pad(hours.toString(), 2),
		pad(minutes.toString(), 2),
		pad(seconds.toString(), 2),
	].join(':');

	return humanized;
}

function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}

export default Timer;