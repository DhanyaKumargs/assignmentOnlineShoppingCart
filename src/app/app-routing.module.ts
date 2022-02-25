import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LadingPageComponent } from './lading-page/lading-page.component';
import { UserItemsPageComponent } from './user-items-page/user-items-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'AdminProucts', component: AddCategoryComponent },
  { path: 'AdminUsersPage', component: UsersPageComponent },
  { path: 'userItems', component: UserItemsPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'landing', component: LadingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
