import React, { useState } from 'react';
import '../Css/ProjectManagement.css';
import Footer from '../Components/Footer';
import '../Css/Footer.css';
import { registerProject } from '../Api';

const ProjectManagement = () => {
  const [projectData, setProjectData] = useState({
    pid: '',
    title: '',
    description: '',
    assignedTeam: '',
    status: '',
    startDate: '',
    endDate: '',
    progressUpdates: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerProject(projectData); // Use projectData
      console.log(response); // Handle success response
      // Redirect to login page or show success message
    } catch (error) {
      console.error(error); // Handle error response
      // Show error message to user
    }
  };

  return (
    <div> 
      <div className="form-container">
        <h2>Project Management</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" name="pid" placeholder="Project ID" value={projectData.pid} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Project Title" value={projectData.title} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Project Description" value={projectData.description} onChange={handleChange} />
          <input type="text" name="assignedTeam" placeholder="Assigned Team" value={projectData.assignedTeam} onChange={handleChange} />
          <input type="text" name="status" placeholder="Status" value={projectData.status} onChange={handleChange} />
          <input type="date" name="startDate" placeholder="Start Date" value={projectData.startDate} onChange={handleChange} />
          <input type="date" name="endDate" placeholder="End Date" value={projectData.endDate} onChange={handleChange} />
          <textarea name="progressUpdates" placeholder="Progress Updates" value={projectData.progressUpdates} onChange={handleChange} />
          <button type="submit">Add Project</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectManagement;
