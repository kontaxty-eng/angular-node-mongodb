const tasksService = require('../services/tasks.service');

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await tasksService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await tasksService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await tasksService.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};