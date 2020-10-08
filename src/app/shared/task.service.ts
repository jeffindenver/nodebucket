/******************************************************************************
* Title: task.service.ts
* Author: Jeff Shepherd
* Modified by:
* Date: 10/7/2020
* Description: task service
******************************************************************************/

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.sessionUser = this.cookieService.get('session_user');
  }

/******************************************************************************
* Find all tasks
******************************************************************************/
findAllTasks(): Observable<any> {
  return this.http.get('/api/employee/' + this.sessionUser + '/tasks');
}

/******************************************************************************
* Create task
******************************************************************************/

/******************************************************************************
* Update task
******************************************************************************/

/******************************************************************************
* Delete task
******************************************************************************/


}
