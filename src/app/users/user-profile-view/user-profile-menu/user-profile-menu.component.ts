import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../user-model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from '../../shared/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';

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

  user: UserModel;
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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUser(this.authService.getUserId())
      .pipe(
        catchError(e => {
          console.log(e);
          return of(null);
        })
      )
      .subscribe(data => this.user = data);
    
    this.route.url.subscribe(url =>{
      const strUrl = url.toString();
      for (let index = 0; index < this.sections.length; index++) {
        const element = this.sections[index];
        if(strUrl.includes(element.link))
          this.selectedSection = element;
      }
    })
  }


}
