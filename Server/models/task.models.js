import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    tid:{
        type:Number,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    assignedTo: {
        type:Number,
    },
    statuss: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
