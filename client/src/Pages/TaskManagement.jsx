import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer';
import { registerTask } from '../Api'; // Adjust import paths as needed
import '../Css/TaskManagement.css';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    tid: '',
    title: '',
    description: '',
    assignedTo: '',
    statuss: '',
    dueDate: '',
    progressUpdates: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v3/business/gettask', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks); // Assuming your backend returns tasks array
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerTask(taskData); // Call registerTask API method
      console.log('Task registered:', response);
      fetchTasks(); // Refresh tasks after successful registration
      setTaskData({
        tid: '',
        title: '',
        description: '',
        assignedTo: '',
        statuss: '',
        dueDate: '',
        progressUpdates: ''
      });
    } catch (error) {
      console.error('Error registering task:', error);
    }
  };

  return (
    <div className="task-management">
      <h2>Task Management</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="tid">Task ID:</label>
          <input type="number" id="tid" name="tid" value={taskData.tid} onChange={handleChange} required />

          <label htmlFor="title">Task Title:</label>
          <input type="text" id="title" name="title" value={taskData.title} onChange={handleChange} required />

          <label htmlFor="description">Task Description:</label>
          <input type="text" id="description" name="description" value={taskData.description} onChange={handleChange} />

          <label htmlFor="assignedTo">Assigned To:</label>
          <input type="number" id="assignedTo" name="assignedTo" value={taskData.assignedTo} onChange={handleChange} />

          <label htmlFor="statuss">Status:</label>
          <input type="text" id="statuss" name="statuss" value={taskData.statuss} onChange={handleChange} />

          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" value={taskData.dueDate} onChange={handleChange} />

          <label htmlFor="progressUpdates">Progress Updates:</label>
          <textarea id="progressUpdates" name="progressUpdates" value={taskData.progressUpdates} onChange={handleChange}></textarea>

          <button type="submit">Add Task</button>
        </form>
      </div>

      <div>
        <h3>Task List</h3>
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Progress Updates</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.tid}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.assignedTo}</td>
                <td>{task.statuss}</td>
                <td>{task.dueDate}</td>
                <td>{task.progressUpdates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default TaskManagement;
