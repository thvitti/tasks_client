import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import APIEndpoints from '../../../APIEndpoints'

class List extends Component {

  async deleteTask(task) {
      if ( window.confirm(`Are you sure you want to delete: "${task.title}" ?`) ){
        await fetch(`${APIEndpoints.TASKS}/${task.id}`, {method: 'DELETE'} );
          this.props.loadTasks();
      }
  }

  async checkTask(task) {

       let method = 'PUT';

       let headers = {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       };

       let payload = {'task': {'done': 'true'}}

       let body = JSON.stringify(payload)

       let data = { method, headers, body }

       await fetch(`${APIEndpoints.TASKS}/${task.id}`, data);

       this.props.loadTasks();
  }


  render() {
    return(
      <div>
        <Card>
          <Card.Body>
            <Table responsive>
              <tbody>
                {this.props.tasks.map( (task, index) => {
                  return <tr key={task.id}>
                    <td className="col-md-10">{task.title}
                    </td>
                    <td>
                      {
                        task.done === false
                        ? <a className="delete" href="/#">
                            <FontAwesomeIcon icon="check-circle" size="lg" onClick={() => this.checkTask(task)}/>
                          </a>
                        : null
                      }
                    </td>
                    <td>
                      <a className="delete" href="/#">
                        <FontAwesomeIcon icon="trash-alt" onClick={ () => this.deleteTask(task) }/>
                      </a>
                    </td>
                  </tr>;
                } )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default List;
