import { Injectable } from '@angular/core';
import { UserModel } from '../user-model';
import { Observable, of } from 'rxjs';
import { AddressModel } from 'src/app/address/address-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserModel = {
    id: 1,
    email: 'mailik',
    password: 'passwordik',
    firstName: 'jozo',
    lastName: 'plesaty',
    imageUrl: 'https://marketwithgeoff.com/wp-content/uploads/2017/11/750814.jpg',
    address: null
  }

  constructor() { }

  registerUser(user: UserModel): Observable<UserModel>{
    return of(user);
  }

  getUser(id: number): Observable<UserModel>{
    this.user.id = id;
    return of(this.user);
  }

  updateUserDetails(user: UserModel): Observable<UserModel>{
    this.user = user;
    return of(user);
  }

  updateUserAddress(user: UserModel,address: AddressModel): Observable<UserModel>{
    user.address = address;
    return of(user);
  }
  
}
