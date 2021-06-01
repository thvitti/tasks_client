import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

let ip = 'https://rails-react-todo-api.herokuapp.com'

function CreateTask(props) {
    const [title, setTitle] = useState('');
    const [show, setShow] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (async (event) => {

      const form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity() === false) {
          setValidated(true);
          return;
      }


      let payload = getData()

      await fetch(`${ip}/tasks`, payload)
       .catch(error => console.log(error));
       clearForm()
       props.loadTasks();

      });

      const handleClose = (event) => {
       clearForm()
      };

      const clearForm = () => {
       setShow(false)
       setTitle('')
      }

      const getData = () => {
        let task    = { title: title, done: false }
        let body    = JSON.stringify(task)
        let method  = 'POST'
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return {method, headers, body}
      }


 return (
   <div>
     <Button onClick={e => setShow(true)}
             variant="dark"
             className="float-right create_task_btn">+ Tasks</Button>

     <Modal show={show || false}
            onHide={e => setShow(false)}
            animation={false} >
       <Form noValidate
             validated={validated}
             onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom">
              <Form.Label>New Task</Form.Label>
              <Form.Control type="text"
                           placeholder="Enter with your task..."
                           value={title || ''}
                           onChange={e => setTitle(e.target.value)}
                           required
                           autoComplete="off"
                           />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Modal.Body>

        <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
         <Button variant="dark" type="submit">
           Create
         </Button>
        </Modal.Footer>
       </Form>
    </Modal>

   </div>
 );
}

export default CreateTask;
