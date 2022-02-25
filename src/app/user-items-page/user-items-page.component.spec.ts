import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemsPageComponent } from './user-items-page.component';

describe('UserItemsPageComponent', () => {
  let component: UserItemsPageComponent;
  let fixture: ComponentFixture<UserItemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserItemsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
