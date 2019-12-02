import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from '../shared/user.service';
import { of } from 'rxjs';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent implements OnInit {

  user: UserModel;

  section: string;

  constructor(
    private _route: ActivatedRoute, 
    private _authService: AuthService,
    private _userService: UserService) { }

  ngOnInit() {
    this._route.paramMap
      .subscribe((params: ParamMap)=> this.section = params.get('section'));

    this._userService.getUser(this._authService.getUserId())
      .pipe(
        catchError(e => {
          console.log(e);
          return of(null);
        })
      )
      .subscribe(data => this.user = data);
  }

}
