/******************************************************************************
 * Title: task.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/7/2020
 * Description: task service
 ******************************************************************************/

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  /******************************************************************************
   * Find all tasks
   ******************************************************************************/
  findAllTasks(id: string): Observable<any> {
    return this.http.get('/api/employee/' + id + '/tasks');
  }

  /******************************************************************************
   * Create task
   ******************************************************************************/
  createTask(id: string, task: string): Observable<any> {
    return this.http.post('/api/employee/' + id + '/tasks',
      { // body of the request
        text: task
      });
  }

  /******************************************************************************
   * Update task
   ******************************************************************************/
  updateTask(id: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('api/employee/' + id + '/tasks',
      { // the body of the request
        todo,
        done
      });
  }

  /******************************************************************************
   * Delete task
   ******************************************************************************/
  deleteTask(id: string, taskId: string): Observable<any> {
    return this.http.delete('/api/employee/' + id + '/tasks/' + taskId);
  }
}
