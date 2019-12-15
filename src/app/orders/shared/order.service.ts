import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/users/user-model';
import { OrderModel } from '../order-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getUserOrders(user: UserModel): Observable<OrderModel[]>{
    return of([]);
  }

  addOrder(order: OrderModel){
    
  }
}
