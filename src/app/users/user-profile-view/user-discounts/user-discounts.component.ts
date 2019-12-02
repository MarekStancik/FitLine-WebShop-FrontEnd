import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../user-model';

@Component({
  selector: 'app-user-discounts',
  templateUrl: './user-discounts.component.html',
  styleUrls: ['./user-discounts.component.scss']
})
export class UserDiscountsComponent implements OnInit {

  @Input() user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
