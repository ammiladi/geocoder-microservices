import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { Observable }           from 'rxjs/Observable';
import { AuthService }      from '../services/auth.service';
import { ActivatedRoute }       from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  facebookLogin(){
      this.authService.authenticate("facebookProvider");
  }

  googleLogin(){
      this.authService.authenticate("googleProvider");
  }

  twitterLogin(){
      this.authService.authenticate("twitterProvider");
  }

  oauth2GeocoderLogin(){
      this.authService.authenticate("oauth2GeocoderProvider");
      
  }

}
