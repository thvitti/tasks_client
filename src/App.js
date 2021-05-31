import React, {Component} from 'react';
import './App.scss';
import Header from './components/header/Header';
import Container from 'react-bootstrap/Container';
import Tasks from './components/tasks/Tasks';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faTrashAlt)

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Container>
          <Tasks />
        </Container>
      </div>
    );
  }
}




export default App;
