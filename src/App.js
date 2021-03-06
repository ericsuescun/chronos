import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimersList from './components/TimersList';
import ControlBar from './components/ControlBar';
import { Container, Row, Col } from 'react-bootstrap';
import store from './store';

class App extends Component {

  constructor() {
    super();
    this.state = {
      newTimer: false,
      timers: [{ title: 'Test', project: 'chirstmas', value: 0, status: false, edit: false }] 
    }

    store.subscribe(()  => {
      this.setState(store.getState());
      }
    );
  }

  render() {
    return (
      <div>
        <h2 className='title' >Timers</h2>
        <hr />
        <Container>
          <Row>
            <Col className='timerList' xs={{ span: 4, offset: 4}}>
              <TimersList />
              {store.getState().newTimer ? <br /> : <ControlBar /> }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
