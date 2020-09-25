/******************************************************************************
 * Title: app.routing.module.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: app routing module
 *****************************************************************************/

import {NgModule} from '@angular/core';
import {AuthGuard} from './auth.guard';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';
import {Routes, RouterModule} from '@angular/router';
import {SigninComponent} from './pages/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [ {path: '', component: HomeComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [ {path: 'signin', component: SigninComponent}]
  },
  {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
