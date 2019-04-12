import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private apiUrl = 'http://localhost:8080';
    constructor(private http: HttpClient){ }

    getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.apiUrl}/task`);
    }

    deleteTask(id): Observable<Task[]> {
      return this.http.delete<Task[]>(`${this.apiUrl}/task?taskId=${id}`);
    }

    createTask(task: Task): Observable<Task> {
      return this.http.post<Task>(`${this.apiUrl}/task`, task);
    }
}
