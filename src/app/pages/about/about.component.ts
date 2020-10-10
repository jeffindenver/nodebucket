/******************************************************************************
 * Title: about.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/10/2020
 * Description: about component
 *****************************************************************************/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutText: string;
  aboutHeadline: string;

  constructor() { }

  ngOnInit(): void {
    this.aboutText = this.getAboutText();
    this.aboutHeadline = this.getHeadline();
  }

/*******************************************************************************
 * Why use functions to return simple strings? In the future, such text
 * might be persisted on a database.
 ******************************************************************************/
  getAboutText(): string {
    return "Nodebucket Task manager is brought to you by the professors \
    and students of the 2020 Bellevue University Web Development Cohort. This \
    project is the first of two projects to be completed in the nine-week intensive \
    boot camp that brings together all the skills previously learned in the program. \
    Skills and technologies brought to bear on the projects include the mean stack: \
    MongoDb, Express, Angular, node.js in addition to JavaScript, TypeScript, \
    RestfulAPIs, html, and css"
  }

  getHeadline(): string {
    return "About nodebucket"
  }


}
