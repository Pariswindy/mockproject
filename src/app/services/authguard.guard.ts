import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public loggin!: boolean

  constructor(public auth: UserService, public router: Router) {
    this.auth.isAuthenticated.subscribe(data=>this.loggin=data)
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.loggin) {
        this.router.navigateByUrl('login')
        return false
      }
      return true
    }
  }

