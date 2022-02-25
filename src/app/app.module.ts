import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { LoginUserAndAdminComponent } from './login-user-and-admin/login-user-and-admin.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UsersPageComponent } from './users-page/users-page.component';
import {HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { SharedService } from './shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from './user-service.service';
// import { MatCardModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UserItemsPageComponent } from './user-items-page/user-items-page.component';
import { CartComponent } from './cart/cart.component';
import { LadingPageComponent } from './lading-page/lading-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignUpComponent,
    LoginComponent,
    LoginUserAndAdminComponent,
    AddCategoryComponent,
    UsersPageComponent,
    UserItemsPageComponent,
    CartComponent,
    LadingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [SharedService,UserServiceService,HeaderComponent,AddCategoryComponent,LoginUserAndAdminComponent],
  bootstrap: [AppComponent],
  exports: [
    MatPaginatorModule
  ],
})
export class AppModule { }
