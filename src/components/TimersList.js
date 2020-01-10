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
		}, 50);
	}

	render() {
		return(
			<div>
				{store.getState().timers.map((timer, index) => 

					
						!timer.edit ? 
						<Timer key={'id' + index} index={index} title={timer.title} project={timer.project} value={timer.value} status={timer.status} edit={timer.edit} />
						:
						<TimerForm index={index} value={timer.value} title={timer.title} project={timer.project} status={timer.status} interval={timer.interval} use={'edition'} edit={timer.edit} />
					

					

					
				)}
				{ store.getState().newTimer ? <TimerForm use={'creation'} /> : <br /> }
			</div>
		);
	}
}

export default TimersList;