import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import store from '../store';

class TimerForm extends Component {
	constructor() {
		super();
		this.state = {
			title: "Título",
			project: "Proyecto",
			value: 0,
			status: false
		}
	}

	handleCancel(e) {
		e.preventDefault();
		store.dispatch({ type: "CANCEL" });
	}

	handleCreate(e) {
		e.preventDefault();
		store.dispatch({ type: "CREATE", title: this.state.title, project: this.state.project });
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

	render() {
		return(
			<div>
				<label>Título</label>
				<input type="text" value={this.state.title} onChange={this.handleChangeTitle.bind(this)} />
				<label>Proyecto</label>
				<input type="text" value={this.state.project} onChange={this.handleChangeProject.bind(this)} />
				<Button variant={"outline-primary"} onClick={this.handleCreate.bind(this)} >Crear</Button>
				<Button variant={"outline-danger"} onClick={this.handleCancel.bind(this)} >Cancelar</Button>
			</div>
		);
	}
}

export default TimerForm;