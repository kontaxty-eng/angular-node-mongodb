const Task = require('../models/task.model');

exports.getAllTasks = async () => {
  return await Task.find();
};

exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

exports.getTaskById = async (id) => {
  return await Task.findById(id);
};

exports.updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

exports.updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
}