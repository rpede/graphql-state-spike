import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserIDResolver implements Resolve<number> {
  constructor(private readonly auth: AuthService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {
    return of(this.auth.getUserId());
  }
}
