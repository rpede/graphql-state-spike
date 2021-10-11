import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly userId = 1;

  getUserId() {
    return AuthService.userId;
  }
}
