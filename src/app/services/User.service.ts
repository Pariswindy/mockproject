import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject } from 'rxjs';
import { currentUser } from 'src/app/models/currentUser';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient,
    private apiService: ApiService,
    private jwtService: JwtService,) {}

  getUser(username: string) {
    return this.http.get<currentUser>(
      `https://conduit.productionready.io/api/profiles/${username}`
    );
  }

  followUser(username: string) {
    return this.http.post(
      `https://conduit.productionready.io/api/profiles/${username}/follow`,
      {}
    );
  }

  unFollowUser(username: string) {
    return this.http.delete(
      `https://conduit.productionready.io/api/profiles/${username}/follow`
    );
  }

  getUpdateUser(password: string ,bio: string,image: string,username: string) {

    return this.http.put('https://conduit.productionready.io/api/user', {
      user:{
          password: password,
          bio: bio,
          image: image,
          username: username
      }
    })
  }

  /* Phần để login/ logout/ theo dõi trạng thái đăng nhập/không đăng nhập của user */

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
  .asObservable()
  .pipe(distinctUntilChanged());

  // private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  attemptAuthLogin(credentials: any): Observable<User> {
    return this.apiService.post('/users/login', {user: credentials})
      .pipe(map((data) => {
        this.setAuth(data.user);

        return data;
      }))
  }

  attemptAuthSignUp(credentials: any): Observable<User> {
    return this.apiService.post('/users', {user: credentials})
      .pipe(map((data) => {
        this.setAuth(data.user);

        return data;
      }))
  }

  attemptAuth(type: string, credentials: any): Observable<User> {
    const route = (type==='login') ? '/login' : '';
    return this.apiService.post('/users'+route, {user: credentials})
      .pipe(map((data) => {
        this.setAuth(data.user);

        return data;
      }))
  }

  // Hàm gọi khi click sign-up/log in để lưu token vào localStorage
  setAuth(user: User) {
    // Save JWT sent from server in localstorage

    this.jwtService.saveToken(user.token)


    // Set current user data into observable
    this.currentUserSubject.next(user);

    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }


  // Hàm dùng để log out
  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User)
    // Set auth status to false
    this.isAuthenticatedSubject.next(false)
  }

  // Hàm để update user trong màn Setting
  update(user: User): Observable<User> {
    return this.apiService.put('/user', {user})
      .pipe(map(data => {
        this.currentUserSubject.next(data.user)
        return data.user
      }))
  }

  // Hàm đổ dữ liệu khi vào app
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe({
        next: (data) => this.setAuth(data.user),
        error: err => this.purgeAuth()
      }
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }




}
