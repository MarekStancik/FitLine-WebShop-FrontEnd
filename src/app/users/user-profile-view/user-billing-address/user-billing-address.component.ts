import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-billing-address',
  templateUrl: './user-billing-address.component.html',
  styleUrls: ['./user-billing-address.component.scss']
})
export class UserBillingAddressComponent implements OnInit {

  formUserAddress = new FormGroup({
    country: new FormControl(null),
    region: new FormControl(null),
    city: new FormControl(null),
    postalCode: new FormControl(null),
    street: new FormControl(null),
    buildingNumber: new FormControl(null),
    floor: new FormControl(null)
  });

  constructor() { }

  ngOnInit() {
  }

}
