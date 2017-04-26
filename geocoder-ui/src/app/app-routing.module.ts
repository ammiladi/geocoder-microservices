import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthService }          from './services/auth.service';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {path: 'authentication', pathMatch: 'prefix', component: LoginComponent},
    {path: 'home',  pathMatch: 'full', component: HomeComponent,  canActivate: [AuthService]},
    {path: 'login', pathMatch: 'full', component: LoginComponent},
   // {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule',  canActivate: [AuthService]},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    NavigationbarComponent,
    HomeComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes 
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [ 
  ]
})
export class AppRoutingModule{}