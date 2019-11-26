import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


interface Section{
  name: string;
  link: string;
}

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

  constructor(private router: Router) { }

  ngOnInit() 
  {

    //Setup Sections
    this.selectedSection = null;
    this.sections = Array.from(SECTIONS);

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
  }

  onSelect(section: Section){
    this.selectedSection = section;
  }
}
