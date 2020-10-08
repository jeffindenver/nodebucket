/******************************************************************************
 * Title: signin.component.ts
 * Author: Professor Krasso
 * Modified by: Jeff Shepherd
 * Date: 9/24/2020
 * Description: signin component
 *****************************************************************************/
import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService,
              private fb: FormBuilder, private http: HttpClient) { }

  /****************************************************************************
   * Angular uses ngOnInit to keep business logic out of the constructor
   * and as life cycle hook. The constructor should only initialize members.
   * Here, the signinForm is created using FormBuilder with a single control
   ***************************************************************************/
  ngOnInit(): void {
    console.log('signin init');
    this.signinForm = this.fb.group({
      idControl: [null, Validators.compose([Validators.required,
        Validators.pattern('^[0-9]*$')])]
    });
  }

  /****************************************************************************
   * login() is invoked when the user clicks the submit button of the signin
   * view. It calls the employee api and returns an employee json object whose
   * id value is stored in a cookie
   ***************************************************************************/
  login(): void {
    const id = this.signinForm.controls.idControl.value;
    console.log("idControl's value is " + id);

    this.http.get('/api/employee/' + id).subscribe(res => {
      if (res) {
        this.cookieService.set('session_user', id, 1);
        this.router.navigate(['/']);
      } else {
        this.error = 'The employee ID you entered is invalid.';
      }
    });
  }

}
