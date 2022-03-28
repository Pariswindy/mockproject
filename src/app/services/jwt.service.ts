import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // Tạo các phương thức để get/ set/ delete token

  getToken(): string|null {
    return window.localStorage.getItem('jwtToken')
  }

  saveToken(token: string) {
    window.localStorage.setItem('jwtToken', token)

  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken')

  }

  constructor() { }
}
