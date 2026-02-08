const tasksService = require('../services/tasks.service');
const Task = require('../models/task.model');

jest.mock('../models/task.model');

describe('Tasks Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
      ];

      Task.find = jest.fn().mockResolvedValue(mockTasks);

      const result = await tasksService.getAllTasks();

      expect(Task.find).toHaveBeenCalled();
      expect(result).toEqual(mockTasks);
    });
  });

  describe('createTask', () => {
    it('should create and save a task', async () => {
      const taskData = { title: 'New Task', description: 'New Description', completed: false };
      const savedTask = { ...taskData, id: 1 };

      const mockTask = {
        save: jest.fn().mockResolvedValue(savedTask),
      };

      Task.mockImplementation(() => mockTask);

      const result = await tasksService.createTask(taskData);

      expect(mockTask.save).toHaveBeenCalled();
      expect(result).toEqual(savedTask);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', async () => {
      const mockTask = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };

      Task.findById = jest.fn().mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('1');

      expect(Task.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const taskId = '1';
      const updateData = { title: 'Updated Task', description: 'Updated Description', completed: true };
      const updatedTask = { id: taskId, ...updateData };

      Task.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTask);

      const result = await tasksService.updateTask(taskId, updateData);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(taskId, updateData, { new: true });
      expect(result).toEqual(updatedTask);
    });
  });
});
