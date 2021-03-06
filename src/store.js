import { createStore } from 'redux';

const chrono = (state, action) => {
	switch(action.type) {
		case 'ADD':
			return {...state, newTimer: true};

		case 'CANCEL':
			let timers4 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers4.push({...timer, edit: false });
				} else {
					timers4.push(timer);
				}
			});
			return { newTimer: false, timers: timers4 };

		case 'CREATE':
			return { newTimer: false, timers: state.timers.concat({ title: action.title, project: action.project, value: 0, status: false, edit: false }) };

		case 'SAVE':
			let timers3 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers3.push({ ...timer, title: action.title, project: action.project, edit: false});
				} else {
					timers3.push(timer);
				}
			});
			return { newTimer: false, timers: timers3 };

		case 'EDIT':
			let timers2 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers2.push({...timer, edit: true });
				} else {
					timers2.push(timer);
				}
			});
			return { newTimer: false, timers: timers2 };

		case 'ERASE':
			let timers7 = [];
			state.timers.map((timer, index) => {
				if(action.index !== index) {
					timers7.push(timer);
					if(timer.status) {
						clearInterval(timer.interval);	
					}
				}
			});
			return { newTimer: false, timers: timers7 };

		case 'STARTSTOP':
			let timers5 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers5.push({...timer, status: !timer.status });
				} else {
					timers5.push(timer);
				}
			});
			return { newTimer: false, timers: timers5 };

		case 'REFRESH':
			let timers6 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers6.push({ ...timer, value: action.value });
				} else {
					timers6.push(timer);
				}
			});
			return { newTimer: state.newTimer, timers: timers6 };

		case 'REFRESH2':
			let timers8 = [];
			state.timers.map((timer, index) => {
				if(action.index === index) {
					timers8.push({ ...timer, value: action.value, interval: action.interval });
				} else {
					timers8.push(timer);
				}
			});
			return { newTimer: state.newTimer, timers: timers8 };

		case 'SCAN':
			return {
					newTimer: state.newTimer, 

					timers: state.timers.map((timer, index) => 
								timer.status ? {...timer, value: timer.value + 50 } : timer 
							)
			};


		default:
			return state;
	}
}

export default createStore(chrono, { newTimer: false, timers: [{ title: 'Merry', project: 'Christmas', value: 70000, status: true, edit: false }, { title: 'Baked Potatoes', project: 'Lunch', value: 45000, status: false, edit: false }, { title: 'French Fries', project: 'Diner', value: 30000, status: false, edit: false }]} );