import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AlertGuard implements CanActivate {
  constructor(private data: DataService,private router: Router) {}
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<true | UrlTree> {
      
      console.log('Guard is checking if there are any alert Items');
      try {
        let listsIsEmpty = (await this.data.countrAlertLists()) === 0;
        if (!listsIsEmpty) return true;
        //no list found -> route to new list page
        return this.router.parseUrl('alertsEditor');
      } catch (error) {
        return true;
      }
  }
}
