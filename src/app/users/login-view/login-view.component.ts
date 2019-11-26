import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  isWrongPass = false;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public bsModalRef: BsModalRef,private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    const val = this.loginForm.value;

    if(val.username && val.password)
    {
      this.authService.login(val.username,val.password)
        .subscribe(
          isLoggedIn => {
            this.isWrongPass = !isLoggedIn;
            if(isLoggedIn){
              const nextUrl = this.authService.isUserAdmin() ? '/admin' : '';
              this.bsModalRef.hide();           
            } 
        },
        err => {
          this.isWrongPass = err;
        }
        );
    }
  }

}
