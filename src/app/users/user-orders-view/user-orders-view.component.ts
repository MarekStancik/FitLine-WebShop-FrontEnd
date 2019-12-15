import { Component, OnInit, Input } from '@angular/core';
import { OrderModel } from 'src/app/orders/order-model';
import { OrderService } from 'src/app/orders/shared/order.service';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-user-orders-view',
  templateUrl: './user-orders-view.component.html',
  styleUrls: ['./user-orders-view.component.scss']
})
export class UserOrdersViewComponent implements OnInit {

  @Input() user: UserModel;

  //Orders container for current user
  orders: OrderModel[];

  constructor(private _ordersService: OrderService) { }

  ngOnInit() {
    this._ordersService.getUserOrders(this.user)
      .subscribe(orders => this.orders = orders);
  }

}
