import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../store';
import { Button } from 'react-bootstrap';

class Timer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			value: props.value,
			title: props.title,
			project: props.project,
			status: props.status,
			interval: props.interval
		}
	}

	handleErase(e) {
		e.preventDefault();
		clearInterval(this.myInterval);
		// this.setState({ title: 'Título', project: 'Proyecto' });
		store.dispatch({ type: "ERASE", index: this.state.index });
	}

	handleEdit(e) {
		e.preventDefault();
		this.setState({ edit: true, title: store.getState().timers[this.state.index].title, project: store.getState().timers[this.state.index].project });
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

		store.dispatch({ type: "STARTSTOP", index: this.state.index });

	}
	
	render() {
		return(
			<div key={this.state.index} >
				{
					!this.state.edit ? 

					<div>
						<h5>{store.getState().timers[this.state.index].title}</h5>
						<p>{store.getState().timers[this.state.index].project}</p>
						<h1>{secondsToHuman(store.getState().timers[this.state.index].value)}</h1>
						<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this) } />
						<FontAwesomeIcon icon="edit" onClick={this.handleEdit.bind(this)} />
						<Button variant={ store.getState().timers[this.state.index].status ? 'danger' : 'success' } onClick={this.handleStartStop.bind(this)} >{store.getState().timers[this.state.index].status ? 'Stop' : 'Start' }</Button>
					</div>
					:
					<div>
						<label>Título</label>
						<input type="text" value={this.state.title} onChange={this.handleChangeTitle.bind(this)} />
						<label>Proyecto</label>
						<input type="text" value={this.state.project} onChange={this.handleChangeProject.bind(this)} />
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