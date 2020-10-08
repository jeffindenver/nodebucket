/******************************************************************************
 * Title: auth-layout.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: auth-layout component
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('auth-layout init');
  }

}
