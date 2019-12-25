import { createStore } from 'redux';

const chrono = (state, action) => {
	switch(action.type) {
		case 'ADD':
			return {...state, edit: true};

		case 'CANCEL':
			return {...state, edit: false};

		case 'CREATE':
			return {edit: false, timers: state.timers.concat({ title: action.title, project: action.project, value: 0, status: false})};

		case 'ERASE':
			let timers = [];
			state.timers.map((timer, index) => {
				if(action.index !== index) {
					timers.push(timer);
				}
			});
			return timers;

		default:
			return state;
	}
}

export default createStore(chrono, { edit: false, timers: [{ title: 'Test', project: 'chirstmas', value: 0, status: false }]} );