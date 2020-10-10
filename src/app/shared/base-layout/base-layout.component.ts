/******************************************************************************
 * Title: base-layout.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: base layout component
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('base layout init');
  }

  signOut(): void {
    this.cookieService.delete('session_user');
    console.log("cookie deleted");
    this.router.navigate(['session/signin']);
  }
}
