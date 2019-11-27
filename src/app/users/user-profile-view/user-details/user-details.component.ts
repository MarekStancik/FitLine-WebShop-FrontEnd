import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

  formUserDetails = new FormGroup({
    email: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    phone: new FormControl(null),
    organization: new FormControl(null),
  });

  constructor() { }

  ngOnInit() {
  }

}
