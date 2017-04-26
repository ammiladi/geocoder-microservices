import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";


import {AppRoutingModule} from "./app-routing.module";
//import {ProtectedDirective} from "./directives/protected.directive";
 
import { AppComponent } from './app.component';
  

import {WindowService} from "./services/window.service";
import {AuthService} from "./services/auth.service";
 
@NgModule({
  declarations: [
    AppComponent,
  //  HomeComponent,
   // LoginComponent,
  //  ProtectedDirective, 
  //  NavigationbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
    
   // RouterModule.forRoot(AppRoutes)
  ],
  providers: [
//   CookieService,
        AuthService,
        WindowService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
 

 

