import Project from "../models/project.models.js";

export const registerProject = async (req, res) => {
    try {
        const { pid, title, description, assignedTeam, status, startDate, endDate, progressUpdates } = req.body;

        if ([pid, title, description, status, startDate, endDate].some((field) => typeof field === 'string' && field.trim() === "")) {
            return res.status(400).json({ message: "Title, Description, Status, Start Date, and End Date fields are required" });
        }

        const existingProject = await Project.findOne({ pid });

        if (existingProject) {
            return res.status(400).json({ message: "Project with this ID already exists" });
        }
        
        const newProject = await Project.create({
            pid,
            title,
            description,
            assignedTeam,
            status,
            startDate,
            endDate,
            progressUpdates
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            newProject,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        if (!projects || projects.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No projects found",
            });
        }

        res.status(200).json({
            success: true,
            projects,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { pid, title, description, assignedTeam, status, startDate, endDate, progressUpdates } = req.body;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        project.pid = pid || project.pid;
        project.title = title || project.title;
        project.description = description || project.description;
        project.assignedTeam = assignedTeam !== undefined ? assignedTeam : project.assignedTeam;
        project.status = status || project.status;
        project.startDate = startDate || project.startDate;
        project.endDate = endDate || project.endDate;
        project.progressUpdates = progressUpdates !== undefined ? progressUpdates : project.progressUpdates;

        project.updatedAt = Date.now();

        await project.save();

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
