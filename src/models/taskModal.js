const { Schema, mongoose } = require('mongoose');

const taskSchema = new Schema(
  {
    label: {
      type: String,
      require: [true, 'Please provide a userid'],
    },
    status: {
      type: String,
      require: [true, 'Please provide a userid'],
    },
    createdAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: process.env.GENERAL_CATEGORY_ID,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.tasks || mongoose.model('tasks', taskSchema);
export default Task;
