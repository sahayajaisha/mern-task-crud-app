import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../slices/tasksSlice";
import { useDispatch } from 'react-redux';

const AddTask = () => {
    const dispatch = useDispatch();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        setSuccessMessage(''); // Clear previous success messages
        setErrorMessage(''); // Clear previous error messages

        try {
            await dispatch(addTaskToServer({ title, description })).unwrap(); // Await dispatch and unwrap result
            setTitle('');
            setDescription('');
            setSuccessMessage('Task added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
        } catch (error) {
            console.error('Error adding task:', error);
            setErrorMessage('Failed to add task: ' + error.message); // Set error message
        }
    };

    return (
        <section className="my-5">
            <Form onSubmit={addTask}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className="text-end">
                    <Button variant="primary" type="submit">
                        Add Task
                    </Button>
                </div>
                {successMessage && (
                    <div className="alert alert-success mt-3">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger mt-3">
                        {errorMessage}
                    </div>
                )}
            </Form>
        </section>
    );
};

export default AddTask;
