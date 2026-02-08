const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.updateTask);

module.exports = router;