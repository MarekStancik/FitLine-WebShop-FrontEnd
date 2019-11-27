import { Injectable } from '@angular/core';
import { UserModel } from '../user-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  registerUser(user: UserModel): Observable<UserModel>{
    return of(user);
  }

  getUser(id: number): Observable<UserModel>{
    const user: UserModel = {
      id: id,
      email: 'mailik',
      password: 'passwordik',
      firstName: 'jozo',
      lastName: 'plesaty',
      imageUrl: 'https://marketwithgeoff.com/wp-content/uploads/2017/11/750814.jpg'
    }

    return of(user);
  }
}
