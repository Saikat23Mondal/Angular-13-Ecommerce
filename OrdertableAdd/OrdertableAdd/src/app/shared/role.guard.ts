import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterLink, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router:Router ){
    
  }
  canActivate() {
    let Role = localStorage.getItem("userType");
    if(Role=="admin"||Role=="Admin"){
      return true;

    }
    else{
      alert("You dont have admin rights")
      this.router.navigate(['/product'])
      return true;
     
    }

  }
  
}
