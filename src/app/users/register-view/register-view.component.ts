import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { UserService } from '../shared/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit {

  formRegister = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    organization: new FormControl(''),
    userAgreement: new FormControl(false)
  });

  emailMessage: string; 
  passwordMessage: string;
  nameMessage: string;
  registerFailureMessage: string;
  userAgrees: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userAgrees = true;
  }

  resetMessages()
  {
    this.emailMessage = this.passwordMessage = this.nameMessage = null;
  }

  hasErrorMsg(): boolean{
    return this.emailMessage !== "" || this.passwordMessage !== "" || this.nameMessage !== "" || !this.userAgrees;
  }

  register()
  {
    this.resetMessages();

    const val = this.formRegister.value;

    if(!val.email){
      this.emailMessage = 'Email can\'t be empty';
    }
    
    if(!val.password || !val.repeatPassword){
      this.passwordMessage = "Passwords can't be empty";
    }
    else if(val.password !== val.repeatPassword){
      this.passwordMessage = "Passwords are not identical"
    }

    if(!val.firstName || !val.firstName){
      this.nameMessage = "Names can't be empty";
    }

    this.userAgrees = val.userAgreement;

    if (this.hasErrorMsg()) {
      return;
    }

    this.userService
      .registerUser(val)
      .pipe(
        catchError(e =>{ 
          console.log(e);
          this.registerFailureMessage = e;
          return of(null);
        }))
      .subscribe(
        user =>{
          
        }
      );
  }

}
