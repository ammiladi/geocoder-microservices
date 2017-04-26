import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, Validators,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from "../services/auth.service";
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public adresseForm = this.fb.group({
    adress: ["", Validators.required],
    city: ["", Validators.required],
    postalCode: ["", Validators.required],
    country: ["", Validators.required]
  });

   constructor(private fb: FormBuilder, private authService: AuthService, private http: Http) {
    }

  ngOnInit() {
  }

  get authenticated() {
    return null;
        //return this.authService.isAuthenticated();
    }


  processGeocoder(event) {
   // console.log(event);
    //console.log(this.loginForm.value);
    this.http.get('localhost:8081:/geocoder')
            .map(response => response.json())
            .subscribe(result => {});
  }

}
