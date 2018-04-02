import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ShoesComponent } from './shoes/shoes.component';
import { HomeComponent } from './home/home.component';
import { ShoeDetailsComponent } from './shoe-details/shoe-details.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


const routes: Routes = [
  {
    path: '', component: SearchComponent
  },
  {
     path: 'signup', component: SignupComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'shoes', component: ShoesComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'shoe/:name', component: ShoeDetailsComponent
  },
  {
    path: 'resetpassword', component: ResetpasswordComponent
  },


];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
