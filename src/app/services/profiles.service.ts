import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private apiService: ApiService) { }

  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
  }

}
