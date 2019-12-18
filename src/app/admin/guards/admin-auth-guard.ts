import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Injectable()

export class AdminAuthGuard implements CanActivate {
    

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        if (this.authService.getToken()) {
            // logged in so return true
            if(this.authService.isUserAdmin()){
                return true;
            }
            else{
                // not admin, navigate to home page
                this.router.navigate(['/']);
                return false;   
            }
        }

        // not logged in so redirect to login page
        this.router.navigate(['/']);
        return false;
    }

    
}