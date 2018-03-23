import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { ShoeService } from './services/shoe.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ShoeComponent } from './shoe/shoe.component';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;





@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ShoeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ShoeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
