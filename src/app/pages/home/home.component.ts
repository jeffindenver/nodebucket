/******************************************************************************
 * Title: home.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: home component
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../../shared/task.service';
import {Item} from '../../shared/item.interface';
import {Employee} from '../../shared/employee.interface';
import {CookieService} from 'ngx-cookie-service';
import {CreateTaskDialogComponent} from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todo: Array<Item>;
  done: Array<Item>;
  employee: Employee;
  id: string;

  constructor(private taskService: TaskService,
              private cookieService: CookieService,
              private dialog: MatDialog) {
    this.id = this.cookieService.get('session_user');
  }

  ngOnInit(): void {
    console.log('home component init');

    this.taskService.findAllTasks(this.id).subscribe(res => {
      console.log('task service');
      console.log(res);
      this.employee = res.data;
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log(this.todo);
      console.log(this.done);
    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    });
  }

  drop(event: CdkDragDrop<any[]>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Reordered the existing list of task items');
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('Moved task item to the container');
      this.updateTaskList(this.id, this.todo, this.done);
    }
  }

  private updateTaskList(id: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(id, todo, done).subscribe(res => {
        this.employee = res.data;
        console.log('update task in home component');
        console.log(this.employee);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      });
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('in open create Task dialog');
      console.log(data);
      if (data) {
        this.taskService.createTask(this.id, data.text).subscribe(res => {
            this.employee = res.data;
          }, (err) => {
            console.log(err);
          },
          () => {
            this.todo = this.employee.todo;
            this.done = this.employee.done;
          });
      }
    });
  }

  deleteTask(taskId: string) {
    console.log(`Task item: ${taskId} was deleted`);

    this.taskService.deleteTask(this.id, taskId).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    });
  }

  // end
}
