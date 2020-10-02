/******************************************************************************
 * Title: base-layout.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: base layout component
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService) { }

  /****************************************************************************
   * The session_user cookie is deleted so that the signin form
   * can be tested. Later, it should be removed or moved to a 'logout' event
   ***************************************************************************/
  ngOnInit(): void {
    console.log("base layout init");
    //this.cookieService.delete('session_user');
    console.log("Cookie deleted");
  }

}
