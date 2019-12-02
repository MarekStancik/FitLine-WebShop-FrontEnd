import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserModel } from '../../user-model';
import { UserService } from '../../shared/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

  //Signalazing when application is communicating in backend
  updating = false;

  //Flag that says that update was sucessfull
  updated = false;

  //Error message received durign failed update attempt
  errorMessage: string;

  @Input() user: UserModel;

  formUserDetails = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    phone: new FormControl(null),
    organization: new FormControl(null),
  });

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.formUserDetails.patchValue({
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: 'phone not impleneted',
      organization: 'org not implemented'
    });
  }

  updateUser(){
    const user = this.formUserDetails.value;
    this.updating = true;
    this._userService.updateUserDetails(user)
      .pipe(catchError((err) =>{
        console.error(err);
        this.errorMessage = "User update failed";
        return of(null);
      }))
      .subscribe((data) =>{ 
        this.updating = false;
        if(data != null)
          this.updated = true;
      });
  }

  onCloseErrorAlert(){
    this.errorMessage = '';
  }

  onCloseSuccessAlert(){
    this.updated = false;
  }

}
