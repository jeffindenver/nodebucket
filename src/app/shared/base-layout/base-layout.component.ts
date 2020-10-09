/******************************************************************************
 * Title: base-layout.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: base layout component
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
    console.log('base layout init');
  }
}
