import React, { Component } from 'react';
import store from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import TimerForm from './TimerForm';
import Timer from './Timer';
import TimerEdit from './TimerEdit';

library.add(faTrashAlt, faEdit);

class TimersList extends Component {

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
			<div>
				{store.getState().timers.map((timer, index) => 
					<div key={'id' + index}>
						{/*<Timer timer={timer} index={index} title={timer.title} project={timer.project} value={timer.value} status={timer.status} edit={timer.edit} />*/}
						{ timer.edit ? 

							<TimerEdit timer={timer} index={index} title={timer.title} project={timer.project} status={timer.status} edit={timer.edit} />
						 	: 
						 	<Timer timer={timer} index={index} title={timer.title} project={timer.project} value={timer.value} status={timer.status} edit={timer.edit} />
						}
					</div>
					
				)}
				{ store.getState().edit ? <TimerForm /> : <br /> }
			</div>
		);
	}
}

export default TimersList;