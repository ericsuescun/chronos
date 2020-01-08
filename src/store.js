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
			console.log(state.timers);
			state.timers.map((timer, index) => {
				if(action.index !== index) {
					timers.push(timer);
				}
			});
			console.log(timers);
			return { edit: false, timers: timers };

		case 'STARTSTOP':
			let timers5 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers5.push({...timer, status: !timer.status, value: action.value });
					console.log('store: ' + timer.title + ' value: ' + action.value);
				} else {
					timers5.push(timer);
				}
			});
			return { edit: false, timers: timers5 };

		case 'REFRESH':
			let timers6 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers6.push({ value: action.value, title: action.title, project: action.project, status: action.status, edit: action.edit });
				} else {
					timers6.push(timer);
				}
			});
			return { edit: state.edit, timers: timers6 };

		default:
			return state;
	}
}

export default createStore(chrono, { edit: false, timers: [{ title: 'Test', project: 'christmas', value: 70000, status: false, edit: false }, { title: 'Eric', project: 'Suescun', value: 45000, status: false, edit: false }, { title: 'Ruth', project: 'Arango', value: 30000, status: false, edit: false }]} );