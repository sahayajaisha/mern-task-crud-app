import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


import { updateTaskInServer } from './../slices/tasksSlice';

import { useSelector, useDispatch } from 'react-redux';

const MyVerticallyCenteredModal = (props) => {
  const { selectedTask, successMessage,error } = useSelector((state) => state.tasks);  //updatemsg

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const dispatch = useDispatch()

  const updateTask = () => {
    props.onHide();
    dispatch(updateTaskInServer({_id:id,title,description}))
  };

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setId(selectedTask._id);
    }
  }, [selectedTask]);


  useEffect(() => {
    if (successMessage) {
        alert(successMessage); // Display success message
    }
    if (error) {
        alert(error); // Display error message
    }
}, [successMessage, error]);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


      {successMessage && (
  <div className="alert alert-success mt-3">  
    {successMessage}
  </div>
)}


        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => updateTask(e)}
          >
            Update Task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
