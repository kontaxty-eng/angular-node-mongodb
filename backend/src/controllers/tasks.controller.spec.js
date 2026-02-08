const tasksService = require('../services/tasks.service');
const tasksController = require('./tasks.controller');

jest.mock('../services/tasks.service');

describe('Tasks Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
      ];

      tasksService.getAllTasks.mockResolvedValue(mockTasks);

      await tasksController.getAllTasks(req, res, next);

      expect(tasksService.getAllTasks).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      tasksService.getAllTasks.mockRejectedValue(error);

      await tasksController.getAllTasks(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', description: 'New Description', completed: false };
      const createdTask = { ...newTask, id: 1 };

      req.body = newTask;
      tasksService.createTask.mockResolvedValue(createdTask);

      await tasksController.createTask(req, res, next);

      expect(tasksService.createTask).toHaveBeenCalledWith(newTask);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdTask);
    });

    it('should handle errors', async () => {
      const error = new Error('Validation error');
      req.body = { title: 'New Task' };
      tasksService.createTask.mockRejectedValue(error);

      await tasksController.createTask(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', async () => {
      const mockTask = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };
      req.params.id = '1';

      tasksService.getTaskById.mockResolvedValue(mockTask);

      await tasksController.getTaskById(req, res, next);

      expect(tasksService.getTaskById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 404 if task not found', async () => {
      req.params.id = '999';
      tasksService.getTaskById.mockResolvedValue(null);

      await tasksController.getTaskById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const updatedTask = { id: 1, title: 'Updated Task', description: 'Updated Description', completed: true };
      req.params.id = '1';
      req.body = updatedTask;

      tasksService.updateTask.mockResolvedValue(updatedTask);

      await tasksController.updateTask(req, res, next);

      expect(tasksService.updateTask).toHaveBeenCalledWith('1', updatedTask);
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    });

    it('should return 404 if task not found', async () => {
      req.params.id = '999';
      req.body = { title: 'Updated Task' };
      tasksService.updateTask.mockResolvedValue(null);

      await tasksController.updateTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });
  });
});
