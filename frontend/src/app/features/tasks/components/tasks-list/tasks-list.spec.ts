import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksList } from './tasks-list';
import { TasksService } from '../../services/tasks';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Task } from '../../models/task';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TasksList', () => {
  let component: TasksList;
  let fixture: ComponentFixture<TasksList>;
  let tasksService: jest.Mocked<TasksService>;
  let dialog: jest.Mocked<MatDialog>;

  const mockTasks: Task[] = [
    { id: 1, title: 'Test Task 1', description: 'Description 1', completed: false },
    { id: 2, title: 'Test Task 2', description: 'Description 2', completed: true },
  ];

  beforeEach(async () => {
    const tasksServiceMock = {
      getAll: jest.fn().mockReturnValue(of(mockTasks)),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const dialogMock = {
      open: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TasksList, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: TasksService, useValue: tasksServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksList);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService) as jest.Mocked<TasksService>;
    dialog = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    component.ngOnInit();
    expect(tasksService.getAll).toHaveBeenCalled();
    expect(component.tasks()).toEqual(mockTasks);
  });

  it('should create a new task when form is valid', () => {
    const newTask = { title: 'New Task', description: 'New Description', completed: false };
    tasksService.create.mockReturnValue(of({ ...newTask, id: 3 }));

    component.form.patchValue(newTask);
    component.onSubmit();

    expect(tasksService.create).toHaveBeenCalledWith(newTask);
    expect(component.tasks().length).toBe(3);
  });

  it('should not submit when form is invalid', () => {
    component.form.patchValue({ title: '', description: '', completed: false });
    component.onSubmit();

    expect(tasksService.create).not.toHaveBeenCalled();
  });

  it('should update an existing task', () => {
    component.tasks.set([...mockTasks]);
    const taskToUpdate = mockTasks[0];
    const updatedTask = { ...taskToUpdate, title: 'Updated Task' };
    
    tasksService.update.mockReturnValue(of(updatedTask));
    
    component.editingTask = taskToUpdate;
    component.form.patchValue({ title: 'Updated Task', description: taskToUpdate.description, completed: taskToUpdate.completed });
    component.onSubmit();

    expect(tasksService.update).toHaveBeenCalledWith(taskToUpdate.id, expect.any(Object));
  });

  it('should populate form when editing task', () => {
    const task = mockTasks[0];
    component.onUpdateTask(task);

    expect(component.editingTask).toBe(task);
    expect(component.form.value.title).toBe(task.title);
    expect(component.form.value.description).toBe(task.description);
  });

  it('should open dialog when showing task', () => {
    const task = mockTasks[0];
    component.onShowTask(task);

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should reset form after creating task', () => {
    const newTask = { title: 'New Task', description: 'New Description', completed: false };
    tasksService.create.mockReturnValue(of({ ...newTask, id: 3 }));

    component.form.patchValue(newTask);
    component.onSubmit();

    expect(component.form.value.title).toBe(null);
  });
});
