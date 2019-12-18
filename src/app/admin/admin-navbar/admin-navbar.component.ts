import { Component, OnInit } from '@angular/core';

interface Section{
  name: string;
  link: string;
  enabled: boolean;
}

const SECTIONS: Section[] = [
  {
    name: 'Products',
    link: '/admin/products',
    enabled: true
  },
  {
    name: 'Categories',
    link: '/admin/categories',
    enabled: true
  },
  {
    name: 'Orders',
    link: '/admin/orders',
    enabled: false
  },
  {
    name: 'Invoices',
    link: '/admin/invoices',
    enabled: false
  },
  {
    name: 'Shipments',
    link: '/admin/shipments',
    enabled: false
  }

]

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  sections: Section[];

  isCollapsed = false;

  constructor() { }

  ngOnInit() 
  {
    this.sections = Array.from(SECTIONS);
  }

}
