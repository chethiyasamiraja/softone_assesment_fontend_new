import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { environment } from 'src/app/environment/environment.prod'; 
import { LoginResponse, Responses, Task } from 'src/app/Modal/task.model'; 


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private apiUrl = environment.API_ENDPOINT + environment.API_CONTROLLER;

  constructor(private http: HttpClient) { } 


   

  /**
   * Generic save method: POST if new, PUT if existing
   */
  saveTask(task: Task): Observable<Responses<Task>> {
    if (task.id) {
      return this.http.put<Responses<Task>>(
        `${this.apiUrl}/${task.id}`,
        task
      );
    } else {
      return this.http.post<Responses<Task>>(
        `${this.apiUrl}`,
        task
      );
    }
  }

  /**
   * GET: Get all tasks
   */
  getAllTasks(): Observable<Responses<Task[]>> {
    return this.http.get<Responses<Task[]>>(`${this.apiUrl}`);
  }

  /**
   * GET: Get task by ID
   */
  getTaskById(id: number): Observable<Responses<Task>> {
    return this.http.get<Responses<Task>>(`${this.apiUrl}/${id}`);
  }

  /**
   * DELETE: Delete task by ID
   */
  deleteTask(id: number): Observable<Responses<string>> {
    return this.http.delete<Responses<string>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Optional: Filter or search tasks
   */
  filterTasks(status: 'all' | 'active' | 'completed'): Observable<Responses<Task[]>> {
    return this.http.get<Responses<Task[]>>(
      `${this.apiUrl}/filter?status=${status}`
    );
  }

  /**
   * Optional: Sort tasks
   */
  sortTasks(sortBy: 'title' | 'created' | 'duedate'): Observable<Responses<Task[]>> {
    return this.http.get<Responses<Task[]>>(
      `${this.apiUrl}/sort?by=${sortBy}`
    );
  }


// In TaskService class
validateUser(username: string, password: string): Observable<LoginResponse> {
  const body = { username, password };
  return this.http.post<LoginResponse>(`${this.apiUrl}/validate`, body);
}







}