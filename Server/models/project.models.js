import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    pid: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    assignedTeam: [{
        memberId: {
            type: Number,
            required: true,
        },
        memberName: {
            type: String,
            required: true,
        },
    }],
    status: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    progressUpdates: [{
        date: {
            type: Date,
            default: Date.now,
        },
        update: {
            type: String,
            required: true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
