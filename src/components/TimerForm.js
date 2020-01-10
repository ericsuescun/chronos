import React, { Component } from 'react';
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import store from '../store';

class TimerForm extends Component {
	constructor(props) {
		super(props);

		if(props.use === 'creation') {
			this.state = {
				title: "",
				project: "",
				value: 0,
				status: false,
			}
		} else {
			this.state = {
				index: props.index,
				value: props.value,
				title: props.title,
				project: props.project,
				status: props.status,
				edit: props.edit,
				interval: props.interval
			}
		}
		
	}

	handleCancel(e) {
		e.preventDefault();
		this.setState({ edit: false });
		store.dispatch({ type: "CANCEL", index: this.state.index });
	}

	handleCreate(e) {
		e.preventDefault();
		
		store.dispatch({ type: "CREATE", title: this.state.title === '' ? 'Timer' : this.state.title, project: this.state.project === '' ? 'Project' : this.state.project });
	}

	handleSubmitCreate(e) {
		e.preventDefault();
		
		store.dispatch({ type: "CREATE", title: this.state.title === '' ? 'Timer' : this.state.title, project: this.state.project === '' ? 'Project' : this.state.project });
	}

	handleSave(e) {
		e.preventDefault();
		this.setState({ edit: false });
		store.dispatch({ type: "SAVE", title: this.state.title, project: this.state.project, index: this.state.index });
	}

	handleSubmitSave(e) {
		e.preventDefault();
		this.setState({ edit: false });
		store.dispatch({ type: "SAVE", title: this.state.title, project: this.state.project, index: this.state.index });
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
{/*				<label>Título</label>
				<input type="text" value={this.state.title} onChange={this.handleChangeTitle.bind(this)} />
				<label>Proyecto</label>
				<input type="text" value={this.state.project} onChange={this.handleChangeProject.bind(this)} />
				<ButtonGroup>
					{
						this.props.use === 'creation' ? 
						<Button variant={"outline-primary"} size="sm" onClick={this.handleCreate.bind(this)} >Crear</Button>
						:
						<Button variant={"outline-primary"} size="sm" onClick={this.handleSave.bind(this)} >Guardar</Button>
					}
					
					<Button variant={"outline-danger"} size="sm" onClick={this.handleCancel.bind(this)} >Cancelar</Button>
				</ButtonGroup>*/}
				<Card className='mb-3' >
				  <Card.Body>
				    <Card.Text>

				    <Form onSubmit={this.props.use === 'creation' ? this.handleSubmitCreate.bind(this) : this.handleSubmitSave.bind(this)} >
				      <Form.Group>
				        <Form.Label>Title</Form.Label>
				        <Form.Control type="text" value={this.state.title} onChange={this.handleChangeTitle.bind(this)} />
				      </Form.Group>

				      <Form.Group>
				        <Form.Label>Project</Form.Label>
				        <Form.Control type="text" value={this.state.project} onChange={this.handleChangeProject.bind(this)} />
				      </Form.Group>
				      <div className="d-flex flex-column">
				      	<ButtonGroup>
				      		{
				      			this.props.use === 'creation' ? 
				      			<Button variant="outline-primary" size="sm" type="submit" >
				      			  Create
				      			</Button>
				      			:
				      			<Button variant="outline-primary" size="sm" type="submit" >
				      			  Save
				      			</Button>
				      		}
				      		<Button variant={"outline-danger"} size="sm" onClick={this.handleCancel.bind(this)} >Cancel</Button>
				      	</ButtonGroup>
				      </div>
				      

				    </Form>
				      
				    </Card.Text>

				  </Card.Body>
				</Card>
			</div>
		);
	}
}

export default TimerForm;