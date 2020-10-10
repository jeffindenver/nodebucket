/******************************************************************************
 * Title: not-found.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/10/2020
 * Description: not found component
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  notFoundText: string;

  constructor() {
  }

  ngOnInit(): void {
    this.notFoundText = "Oh no! That bucket is empty."
  }

}
