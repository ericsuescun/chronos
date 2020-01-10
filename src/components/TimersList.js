import React, { Component } from 'react';
import store from '../store';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import TimerForm from './TimerForm';
import Timer from './Timer';
// import TimerEdit from './TimerEdit';

library.add(faTrashAlt, faEdit);

class TimersList extends Component {

	componentDidMount() {
		this.myInterval = setInterval(() => {
			store.dispatch({ type: 'SCAN' });
		}, 1000);
	}

	render() {
		return(
			<div>
				{store.getState().timers.map((timer, index) => 

					<Timer key={'id' + index} index={index} title={timer.title} project={timer.project} value={timer.value} status={timer.status} edit={timer.edit} />

					
				)}
				{ store.getState().edit ? <TimerForm /> : <br /> }
			</div>
		);
	}
}

export default TimersList;