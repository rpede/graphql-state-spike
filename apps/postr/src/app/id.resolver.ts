import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IDResolver implements Resolve<number> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): number | Observable<number> | Promise<number> {
    const id = Number.parseInt(route.paramMap.get('id') || '', 10);
    if (Number.isNaN(id)) {
      throw new Error('Invalid value for parameter "id"!');
    }
    return id;
  }
}
