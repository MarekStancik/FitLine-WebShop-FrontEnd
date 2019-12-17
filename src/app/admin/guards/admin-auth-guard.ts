import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../admin-auth-service/auth.service';

@Injectable()

export class AdminAuthGuard implements CanActivate {
    

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        if (this.authService.getToken()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }

    
}