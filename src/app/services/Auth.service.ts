import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  Observable } from 'rxjs';
import { currentUser } from 'src//app/models/currentUser';
import { CheckDeactivate } from '../models/checkActive';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanDeactivate<CheckDeactivate> {
  public token:string=""
  isLogged: boolean = false;
  currentUser!: {
        username: string;
        email: string;
        token: string;
    };
  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  createUser(userData : any) {
    return this.http.post<any>('https://conduit.productionready.io/api/users', {
      user: userData
    })
  }

  login(dataLogin: any) {
    console.log('success')
    return this.http.post<any>('https://conduit.productionready.io/api/users/login', {
      isLogged : true,
    })
  }
  getUser() {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this.currentUser.token}`
    })}
    return this.http.get<currentUser>('https://conduit.productionready.io/api/user', option)


  }
  setLogin() {
    this.isLogged = true;
  }

  setLogout() {
    this.isLogged = false;
  }

  get isAuthenticated(): boolean {
    let user : any = localStorage.getItem('jwtToken');
    if(!this.currentUser) {
      if (!user) {
        this.currentUser = JSON.parse(user);
        return false;
      }
    }
    this.currentUser = JSON.parse(user);
    this.isLogged = true;
    return true;
  }
  canDeactivate(component: CheckDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
}
