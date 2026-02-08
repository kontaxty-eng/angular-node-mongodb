import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  create(task: any) {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  update(id: number, task: any) {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, task);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }
}
