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
    
    let passRegex = /\d/;
    if(!val.password || !val.repeatPassword){
      this.passwordMessage = "Passwords can't be empty";
    }
    else if(val.password !== val.repeatPassword){
      this.passwordMessage = "Passwords are not identical";
    }
    else if(val.password.length < 8){
      this.passwordMessage = "Password length has to be at least quantilion symbols";
    }
    else if(!val.password.match(passRegex)){
      this.passwordMessage = 'Password has to contain unborn child of unicorn';
    }

    if(!val.firstName || !val.lastName){
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
