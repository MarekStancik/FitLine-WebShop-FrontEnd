import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../user-model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Section{
  name: string;
  link: string;
}

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss']
})
export class UserProfileMenuComponent implements OnInit {

  @Input() user: UserModel;

  sections: Section[] = [
    {
    name: 'User Details',
    link: 'details'
    },
    {
      name:'Billing Addresses',
      link: 'address'
    },
    {
      name: 'Discount Cards',
      link: 'cards'
    },
    {
      name: 'News Subscription',
      link: 'subs'
    }
    
  ]

  selectedSection: Section;

  constructor() { }

  ngOnInit() {
    
  }


}
