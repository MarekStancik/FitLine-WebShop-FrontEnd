import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginViewComponent } from '../login-view/login-view.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private authService: AuthService,private modalService: BsModalService) { }

  ngOnInit() {
  }

  isLoggedIn() : boolean{
    return this.authService.getToken() !== null;
  }

  logout(){
    this.authService.logout();
  }

  openLoginModal(){
    this.bsModalRef = this.modalService.show(LoginViewComponent);
  }

}
