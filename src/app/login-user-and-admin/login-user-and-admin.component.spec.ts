import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserAndAdminComponent } from './login-user-and-admin.component';

describe('LoginUserAndAdminComponent', () => {
  let component: LoginUserAndAdminComponent;
  let fixture: ComponentFixture<LoginUserAndAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUserAndAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserAndAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
