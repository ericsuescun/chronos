import React, { Component } from 'react';
import store from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import TimerForm from './TimerForm';

library.add(faTrashAlt, faEdit);

class TimersList extends Component {

	handleErase(index, e) {
		e.preventDefault();
		store.dispatch({ type: "ERASE", index: index });
	}
	render() {
		return(
			<div>
				{store.getState().timers.map((timer, index) => 
					<div key={'id' + index}>
						<h5>{timer.title}</h5>
						<p>{timer.project}</p>
						<h1>{timer.value}</h1>
						<FontAwesomeIcon icon="trash-alt" onClick={this.handleErase.bind(this, index) } />
						<FontAwesomeIcon icon="edit" />
						<p>{timer.status ? 'running' : 'stopped' }</p>
					</div>
				)}
				{ store.getState().edit ? <TimerForm /> : <br /> }
			</div>
		);
	}
}

export default TimersList;