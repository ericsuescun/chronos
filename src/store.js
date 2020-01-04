import { createStore } from 'redux';

const chrono = (state, action) => {
	switch(action.type) {
		case 'ADD':
			return {...state, edit: true};

		case 'CANCEL':
			let timers4 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers4.push({...timer, edit: false });
				} else {
					timers4.push(timer);
				}
			});
			return { edit: false, timers: timers4 };

		case 'CREATE':
			return { edit: false, timers: state.timers.concat({ title: action.title, project: action.project, value: 0, status: false, edit: false }) };

		case 'SAVE':
			let timers3 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					// timers3.push({edit: false, timers: { title: action.title, project: action.project, value: 0, status: false, edit: false } });
					timers3.push({ title: action.title, project: action.project, value: 0, status: false, edit: false});
				} else {
					timers3.push(timer);
				}
			});
			console.log({ edit: false, timers: timers3 });
			return { edit: false, timers: timers3 };

		case 'EDIT':
			let timers2 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers2.push({...timer, edit: true });
				} else {
					timers2.push(timer);
				}
			});
			return { edit: false, timers: timers2 };

		case 'ERASE':
			let timers = [];
			state.timers.map((timer, index) => {
				if(action.index !== index) {
					timers.push(timer);
				}
			});
			return { edit: false, timers: timers };

		default:
			return state;
	}
}

export default createStore(chrono, { edit: false, timers: [{ title: 'Test', project: 'chirstmas', value: 0, status: false, edit: false }]} );