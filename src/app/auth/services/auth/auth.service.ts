import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080'; // Changed to string

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/api/auth/signup', signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/api/auth/login', loginRequest);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(BASE_URL + '/api/auth/users');
  }
}
