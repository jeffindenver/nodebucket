/******************************************************************************
 * Title: create-task-dialog.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/8/2020
 * Description: create task dialog
 ******************************************************************************/
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      // text is the single control of this form, initialized with null
      // and optioned to require validation
      text: [null, Validators.compose([Validators.required])]
    });
  }

  createTask(): void {
    console.log(this.taskForm.value);
    // the argument is an optional return value
    this.dialogRef.close(this.taskForm.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
