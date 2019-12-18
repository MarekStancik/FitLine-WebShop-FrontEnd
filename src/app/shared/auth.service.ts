import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface LoginModel{
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://localhost:44303/token'

  users: LoginModel[] = [
    {
      id: 1,
      username: 'marek',
      password: 'passwordik',
      isAdmin: true
    }
  ];

  constructor(private http: HttpClient) { }

  login(username: string,password: string): Observable<boolean>
  {
    return this.http.post<any>(this.authUrl,{username,password})
    .pipe(map(response => {
      const token = response.token;
      const isAdmin = response.isAdmin;

      if(token){
        localStorage.setItem('currentUser',JSON.stringify({username,password,isAdmin,token}));
        return true;
      }else{
        return false;
      }
    }));
    /*for (let index = 0; index < this.users.length; index++) {
      const element = this.users[index];
      if(element.username === username && element.password === password){
        localStorage.setItem('currentUser',JSON.stringify({id: element.id,username,password,isAdmin: element.isAdmin,token: 'token'}));
        return of(true);
      }
    }
    return of(false);*/
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.token : null;
  }

  getUsername(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.username : null;
  }

  getUserId(): number{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.id : null;
  }

  isUserAdmin() : boolean{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.isAdmin : false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
