import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../user-model';

@Component({
  selector: 'app-user-news-subs',
  templateUrl: './user-news-subs.component.html',
  styleUrls: ['./user-news-subs.component.scss']
})
export class UserNewsSubsComponent implements OnInit {

  @Input() user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
