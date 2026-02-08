import { Component, OnInit, signal } from '@angular/core';
import { Task } from '../../models/task';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TasksService } from '../../services/tasks';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDetailDialogComponent } from '../task-detail-dialog/task-detail-dialog';

@Component({
  selector: 'app-list',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatDialogModule],
  standalone: true,
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList implements OnInit {
  tasks = signal<Task[]>([]);
  editingTask: Task | null = null;

  form: FormGroup;

  constructor(
    private tasksService: TasksService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = this.taskForm();
  }

  private taskForm(task?: Task): FormGroup {
    return this.fb.group({
      title: [task?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [task?.description || '', [Validators.required, Validators.minLength(5)]],
      completed: new FormControl(false)
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getAll().subscribe((tasks) => {
      this.tasks.set(tasks as Task[]);
    })
  }

  onUpdateTask(task: Task) {
    this.editingTask = task;
    this.form.patchValue({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const taskData: Task = {
        title: this.form.value.title,
        description: this.form.value.description,
        completed: this.form.value.completed
      };

      if (this.editingTask) {
        // Update existing task
        this.tasksService.update(this.editingTask._id!, taskData).subscribe((updatedTask: any) => {
          this.tasks.update(tasks => 
            tasks.map(t => t._id === this.editingTask!._id ? updatedTask : t)
          );
          this.form.reset();
          this.editingTask = null;
        });
      } else {
        // Create new task
        this.tasksService.create(taskData).subscribe((createdTask: any) => {
          this.tasks.update(tasks => [...tasks, createdTask]);
          this.form.reset();
        });
      }
    }
  }

  onShowTask(task: Task) {
  this.dialog.open(TaskDetailDialogComponent, {
    data: task,
    width: '500px'
  });
}
}
