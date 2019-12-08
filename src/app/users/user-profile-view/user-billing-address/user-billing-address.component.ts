import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserModel } from '../../user-model';
import { InputValidator } from 'src/app/shared/input-validator';
import { UserService } from '../../shared/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-billing-address',
  templateUrl: './user-billing-address.component.html',
  styleUrls: ['./user-billing-address.component.scss']
})
export class UserBillingAddressComponent implements OnInit {

  //Signalazing when application is communicating in backend
  updating = false;

  //Flag that says that update was sucessfull
  updated = false;

  //Error message received durign failed update attempt
  errorMessage: string;

  @Input() user: UserModel;

  formUserAddress = new FormGroup({
    country: new FormControl(null),
    region: new FormControl(null),
    city: new FormControl(null),
    postalCode: new FormControl(null),
    street: new FormControl(null),
    buildingNumber: new FormControl(null),
    floor: new FormControl(null)
  });

  constructor(private _userService: UserService) { }

  ngOnInit() {
    if(this.user && this.user.address != null)
    {
      const addr = this.user.address;
      this.formUserAddress.patchValue({
        country: addr.country,
        region: addr.region,
        city: addr.city,
        postalCode: addr.postalCode,
        street: addr.street,
        buildingNumber: addr.buildingNumber,
        floor: addr.floor
      });
    }
  }

  updateAddress(){
    const addr = this.formUserAddress.value;

    this.errorMessage = InputValidator.validateBillingAddress(addr);
    this.updated = false;
    
    if(this.errorMessage === "") //There is no error in validation
    {
      this.updating = true;
      this._userService.updateUserAddress(this.user,addr)
        .pipe(catchError((err) =>{
          console.error(err);
          this.errorMessage = "Address update has failed";
          return of(null);
        }))
        .subscribe((data) =>{ 
          this.updating = false;
          if(data != null)
            this.updated = true;
        });
    }
  }

  onCloseErrorAlert(){
    this.errorMessage = '';
  }

  onCloseSuccessAlert(){
    this.updated = false;
  }

}
