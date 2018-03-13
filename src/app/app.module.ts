import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { ShoeService } from './services/shoe.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ShoeComponent } from './shoe/shoe.component';




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
    AppRoutingModule
  ],
  providers: [ShoeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
