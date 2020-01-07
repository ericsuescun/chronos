import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import store from '../store';

class TimerEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			title: props.title,
			project: props.project,
			status: props.status,
			edit: props.edit
		}
	}

	handleCancel(index, e) {
		e.preventDefault();
		store.dispatch({ type: "CANCEL", index: index });
	}

	handleSave(index, e) {
		e.preventDefault();
		store.dispatch({ type: "SAVE", title: this.state.title, project: this.state.project, index: index });
		console.log('SAVE');
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
				<Button variant={"outline-primary"} onClick={this.handleSave.bind(this, this.state.index)} >Guardar</Button>
				<Button variant={"outline-danger"} onClick={this.handleCancel.bind(this, this.state.index)} >Cancelar</Button>
			</div>
		);
	}
}

export default TimerEdit;