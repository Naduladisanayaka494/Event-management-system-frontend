import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser() {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserId(): string {
    const user = StorageService.getUser();
    return user ? user.id : '';
  }

  static getUserRole() {
    const user = StorageService.getUser();
    return user ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    if (StorageService.getToken() == null) {
      return false;
    } else {
      const role: string = StorageService.getUserRole();
      return role === 'ADMIN';
    }
  }

  static isSingerLoggedIn(): boolean {
    if (StorageService.getToken() == null) {
      return false;
    } else {
      const role: string = StorageService.getUserRole();
      return role === 'SINGER';
    }
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
