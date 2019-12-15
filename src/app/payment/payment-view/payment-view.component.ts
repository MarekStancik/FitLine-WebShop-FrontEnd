import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/users/user-model';
import { ProductModel } from 'src/app/products/product.model';
import { BasketService } from 'src/app/basket/basket.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss']
})
export class PaymentViewComponent implements OnInit {

  user: UserModel;
  products: ProductModel[];

  constructor(private _basket: BasketService, private _authService: AuthService) { }

  ngOnInit() {
    //this.products = this._basket.
  }
/*
  //Item in list
  //document is completely left out 
  productInListJson = {
    id: 1,
    name: 'Protein',
    categoryId: 1,
    supplierId: 2,
    image: 'assets/bestpepe.png',//one should be enough,       //[ 'assets/mypepe.png','asstes/yourpepe.png'],
    description: 'If you will eat this stuff you will be 100% vegan',
    price: 20.58, //this is questionable But it should sellect the lowest one from the variations
  }

  //Product details
  jsonDetail = {
    id: 1,
    name: 'Tasty Vegan Milk Protein',
    category: {
      id: 1,
      name: 'Vegan proteins',
      parent: {
        id: 2,
        name: 'proteins',
        parent: {
          id:3,
          name: 'supplements',
          parent: null
        }
      }
    },
    supplierId: 2, //supplier id should be enought anyway
    images: [ 'assets/mypepe.png','asstes/yourpepe.png'], //More images for carousel
    description: 'If you will eat this stuff you will be 100% vegan',
    document: 'some kokotina',
    variatons: [{
      itemCode: 2558,
      amount: 10,
      price: 25.88,
      options: [{
        name: 'Size',
        value: '2000g'
      },
      {
        name: 'Flavour',
        value: 'Vegan bacon'
      }]
    },
    {
      itemCode: 2664,
      amount: 25,
      price: 14.66,
      options: [{
        name: 'Size',
        value: '1000g'
      },
      {
        name: 'Flavour',
        value: 'Vegan bacon'
      }]
    }]
  }*/

}
