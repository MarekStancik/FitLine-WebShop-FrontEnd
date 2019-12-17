import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://localhost:44303/token'

 

  constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<boolean> {
      return this.http.post<any>(this.authUrl, { username, password })
        .pipe(map(response => {
          const token = response.token;
          // login successful if there's a jwt token in the response
          if (token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        }));
    }

    getToken(): string {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        return currentUser.token;
      } else {
        return null;
      }
    }

    getUsername(): string {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        return currentUser.username;
      } else {
        return null;
      }
    }

  logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
