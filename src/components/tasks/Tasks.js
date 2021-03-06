import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import List from './list/List';

import CreateTask from './create_tasks/CreateTasks';
import Button from 'react-bootstrap/Button';
import APIEndpoints from '../../APIEndpoints'
class Tasks extends Component {

  constructor(props) {
      super(props);
      this.state = {
        tasks: []
      };
      this.loadTasks = this.loadTasks.bind(this);
  }

  async loadTasks() {

    let response = await fetch(APIEndpoints.TASKS);
    const tasks = await response.json();
    this.setState({ tasks: tasks });
  }

  async deleteAllTasks(){
      if( window.confirm('This action will remove all tasks. Continue?') ){
        await fetch(APIEndpoints.TASKS_DESTROY_ALL, {method: 'DELETE'})
        this.loadTasks();
      }
  }

  componentDidMount() {
    this.loadTasks();
  }



  render() {
    return(
      <Row>
           <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
             <p className="title">To-do</p>
             <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter( (task) => task.done !== true)}/>
             <CreateTask loadTasks={this.loadTasks}/>
           </Col>
           <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
             <p className="title">Done</p>
             <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter( (task) =>  task.done === true )}/>
             <Button variant="red" className="float-right remove_tasks_btn" onClick={() => this.deleteAllTasks() } >Remove all tasks</Button>
           </Col>
         </Row>
    );
  }
}

export default Tasks;
