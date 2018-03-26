import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ShoeService } from './services/shoe.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { environment } from '../environments/environment';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ShoesComponent } from './shoes/shoes.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SignupComponent,
    SigninComponent,
    ShoesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [ShoeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
