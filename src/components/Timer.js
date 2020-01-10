import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../store';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import TimerForm from './TimerForm';

class Timer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			value: props.value,
			title: props.title,
			project: props.project,
			status: props.status,
			edit: props.edit,
			interval: props.interval
		}
	}

	handleErase(e) {
		e.preventDefault();
		clearInterval(this.myInterval);
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
{/*				<h5>{store.getState().timers[this.state.index].title}</h5>
				<p>{store.getState().timers[this.state.index].project}</p>
				<h3>{secondsToHuman(store.getState().timers[this.state.index].value)}</h3>
				<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this) } />
				<FontAwesomeIcon icon="edit" onClick={this.handleEdit.bind(this)} />
				<Button variant={ store.getState().timers[this.state.index].status ? 'outline-danger' : 'outline-success' } onClick={this.handleStartStop.bind(this)} block>{store.getState().timers[this.state.index].status ? 'Stop' : 'Start' }</Button>*/}

				<Card className='mb-3'>
				  <Card.Body>
				    <Card.Title><h5>{store.getState().timers[this.state.index].title}</h5></Card.Title>
				    <Card.Subtitle className="mb-2 text-muted">{store.getState().timers[this.state.index].project}</Card.Subtitle>
				    <Card.Text>
				      <h3 className='timeNumber'>{secondsToHuman(store.getState().timers[this.state.index].value)}</h3>
				      <div className='timerControls'>
				      	<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this) } />
				      	<span> </span>
				      	<FontAwesomeIcon icon="edit" onClick={this.handleEdit.bind(this)} />
				      </div>
				    </Card.Text>
				    <Button variant={ store.getState().timers[this.state.index].status ? 'outline-danger' : 'outline-success' } onClick={this.handleStartStop.bind(this)} block>{store.getState().timers[this.state.index].status ? 'Stop' : 'Start' }</Button>
				  </Card.Body>
				</Card>

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