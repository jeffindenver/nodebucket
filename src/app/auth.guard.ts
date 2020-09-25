/******************************************************************************
 * Title: auth.guard.ts
 * Author: Professor Krasso
 * Modified by: Jeff Shepherd
 * Date: 9/24/2020
 * Description: auth guard
 *****************************************************************************/

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private cookieService: CookieService) { }

  /****************************************************************************
   * canActivate implements the CanActivate interface, which allows navigation
   * to continue if the guard returns true. Otherwise, it will direct users
   * to the sign-in page.
   ***************************************************************************/
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean
  {
    const sessionUser = this.cookieService.get('session_user');
    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(['session/signin']);
      return false;
    }
  }

}
