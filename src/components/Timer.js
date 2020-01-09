import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
// import TimerForm from './TimerForm';
import store from '../store';
import { Button } from 'react-bootstrap';

class Timer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			value: props.value
		}
	}

	handleErase(e) {
		e.preventDefault();
		// clearInterval(this.myInterval);
		store.dispatch({ type: "ERASE", index: this.state.index });
	}

	handleEdit(e) {
		e.preventDefault();
		this.setState({ edit: true });
		store.dispatch({ type: "EDIT", index: this.state.index });
	}

	handleCancel(e) {
		e.preventDefault();
		this.setState({ edit: false });
		store.dispatch({ type: "CANCEL", index: this.state.index });
	}

	handleSave(e) {
		e.preventDefault();
		this.setState({ edit: false });
		store.dispatch({ type: "SAVE", title: this.state.title, project: this.state.project, index: this.state.index });
	}


	handleChangeTitle(e) {
		this.setState({
			title: e.target.value
		})
	}

	handleChangeProject(e) {
		this.setState({
			project: e.target.value
		})
	}

	handleStartStop(e) {
		e.preventDefault();
		console.log('start-stop');
		if(!store.getState().timers[this.state.index].status) {
			this.myInterval = setInterval(() => {
				this.setState({ value: store.getState().timers[this.state.index].value + 1 });
				store.dispatch({ type: "REFRESH", index: this.state.index, value: this.state.value });
			}, 1000);
			console.log('Interval ID: ' + this.myInterval);
		} else {
			clearInterval(this.myInterval);
		}
		
		store.dispatch({ type: "STARTSTOP", index: this.state.index, value: this.state.value });
		// store.dispatch({ type: "STARTSTOP", index: this.state.index, value: store.getState().timers[this.state.index].value });
	}

	componentWillUnmount() {
		console.log('component UNmount');
		console.log(this.state.index);
		clearInterval(this.myInterval);
	}

	componentDidMount() {
		console.log('component mount');
		console.log(this.state.index);
		console.log(store.getState().timers[this.state.index].status);
		if(store.getState().timers[this.state.index].status) {
			this.myInterval = setInterval(() => {
				this.setState({ value: store.getState().timers[this.state.index].value + 1 });
				store.dispatch({ type: "REFRESH", index: this.state.index, value: this.state.value });
			}, 1000);
		}
	}
	
	render() {
		return(
			<div key={this.state.index} >
				{
					!this.state.edit ? 

					<div>
						<h5>Timer: {this.state.index}</h5>
						<h5>{store.getState().timers[this.state.index].title}</h5>
						<p>{store.getState().timers[this.state.index].index}</p>
						<p>{store.getState().timers[this.state.index].project}</p>
						<h1>{secondsToHuman(store.getState().timers[this.state.index].value)}</h1>
						<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this) } />
						<FontAwesomeIcon icon="edit" onClick={this.handleEdit.bind(this)} />
						<Button variant={ store.getState().timers[this.state.index].status ? 'danger' : 'success' } onClick={this.handleStartStop.bind(this)} >{store.getState().timers[this.state.index].status ? 'Stop' : 'Start' }</Button>
						<p>{store.getState().timers[this.state.index].status ? 'running' : 'stopped' }</p>
					</div>
					:
					<div>
						<label>Título</label>
						<input type="text" value={store.getState().timers[this.state.index].title} onChange={this.handleChangeTitle.bind(this)} />
						<label>Proyecto</label>
						<input type="text" value={store.getState().timers[this.state.index].project} onChange={this.handleChangeProject.bind(this)} />
						<Button variant={"outline-primary"} onClick={this.handleSave.bind(this)} >Guardar</Button>
						<Button variant={"outline-danger"} onClick={this.handleCancel.bind(this)} >Cancelar</Button>
					</div>
				}
			</div>
		);
	}
}

// function secondsToHuman(s) {
// 	const seconds = Math.floor((s / 1000) % 60);
// 	const minutes = Math.floor(((s / 1000) / 60) % 60);
// 	const hours = Math.floor((s / 1000) / 60 / 60);

// 	const humanized = [
// 		pad(hours.toString(), 2),
// 		pad(minutes.toString(), 2),
// 		pad(seconds.toString(), 2),
// 	].join(':');

// 	return humanized;
// }

function secondsToHuman(s) {
	const seconds = Math.floor((s) % 60);
	const minutes = Math.floor(((s) / 60) % 60);
	const hours = Math.floor((s) / 60 / 60);

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