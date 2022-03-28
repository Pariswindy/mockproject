import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // GET method using with API
  get(path: string, params: HttpParams=new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {params})
    .pipe(catchError(err => {throw err}))
  }

  // POST method using with API
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body))
  }

  // PUT method using with API
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body))
    .pipe(catchError(err => {throw err}))
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(err => {throw err}));
  }




}
