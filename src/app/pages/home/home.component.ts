/******************************************************************************
 * Title: home.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: home component
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../shared/task.service';
import { Item } from '../../shared/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todo: Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log('home component init');

    this.taskService.findAllTasks().subscribe(res => {
      console.log('task service');
      console.log(res);

      this.todo = res.data.todo;
      this.done = res.data.done;

      console.log(this.todo);
      console.log(this.done);
    }, err => {
      console.log(err);
    });
  }

}
