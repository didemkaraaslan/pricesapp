import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component'
import { SigninComponent } from './signin/signin.component';
import { ShoesComponent } from './shoes/shoes.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { 
    path:'search', component: SearchComponent
  },
  {
     path:'signup', component: SignupComponent
  },
  { 
    path:'signin', component: SigninComponent
  },
  {
    path:'shoes', component: ShoesComponent
  },
  {
    path:'home', component: HomeComponent
  }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
