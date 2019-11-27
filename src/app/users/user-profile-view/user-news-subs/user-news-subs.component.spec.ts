import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewsSubsComponent } from './user-news-subs.component';

describe('UserNewsSubsComponent', () => {
  let component: UserNewsSubsComponent;
  let fixture: ComponentFixture<UserNewsSubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNewsSubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewsSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
