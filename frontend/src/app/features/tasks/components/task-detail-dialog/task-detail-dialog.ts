import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p><strong>Description:</strong> {{ data.description }}</p>
      <p><strong>Status:</strong> {{ data.completed ? 'Completed' : 'To Do' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class TaskDetailDialogComponent {
  data = inject<Task>(MAT_DIALOG_DATA);
}