import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, catchError } from 'rxjs/operators';
import { ProductModel } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/shared/product.service';
import { of } from 'rxjs';

interface Section{
  name: string;
  link: string;
}

const SUPPLEMENTS_IDX = 0;

const SECTIONS: Section[] = [
  {
    name: 'Supplements',
    link: 'products/supplements'
  },
  {
    name: 'Clothing',
    link: 'products/clothes'
  },
  {
    name: 'Exercise Machines',
    link: 'products/machines'
  },
  {
    name: 'Barbells',
    link: 'products/barbells'
  },
  {
    name: 'Tool Racks',
    link: 'products/racks'
  },
  {
    name: 'Discounts',
    link: '/discounts'
  },
  {
    name: 'Brands',
    link: '/brands'
  }
]

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  sections: Section[];
  selectedSection: Section;
  supplementsSection: Section;
  allProducts: ProductModel[];

  constructor(/*private authService: AuthService,*/private router: Router,private productService: ProductService) { }

  ngOnInit() 
  {

    //Setup Sections
    this.selectedSection = null;
    this.sections = Array.from(SECTIONS);
    this.supplementsSection = this.sections[SUPPLEMENTS_IDX];

    //Setup Selected Section
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe( 
        (navEnd:NavigationEnd) => {
          for (let index = 0; index < this.sections.length; ++index) 
          {
            const element = this.sections[index];
            if(element.link === navEnd.urlAfterRedirects)
            {
              this.selectedSection = element;
              break;
            }
          }
      });

      //Load all products for search bar
      this.productService.getAll()
        .pipe(
          catchError(err => {
            console.log(err);
            return of([]);
          })
        )
        .subscribe(products => this.allProducts = products);
  }

  onSelect(section: Section){
    this.selectedSection = section;
   // if(section === this.logoutSection)
     // this.logout();
  }

  shouldShowSection(section: Section): boolean{
   /* if(section === this.loginSection){
      return !this.isLoggedIn();
    }
    if(section === this.logoutSection){
      return this.isLoggedIn();
    }
    if(section === this.manageSection){
      return this.isAdmin();
    }
    else
      return true;*/
    return true;
  }

  isLoggedIn() : boolean{
    return false;//this.authService.getToken() !== null;
  }

  isAdmin(): boolean{
    return false;//this.authService.isUserAdmin();
  }

  logout(){
    //this.authService.logout();
  }

}
