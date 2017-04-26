import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-navigationbar',
    templateUrl: './navigationbar.component.html',
})
export class NavigationbarComponent {
    constructor(private authService: AuthService) {
    }

  

    doLogin() {
       
    }

    doLogout() {
      
    }

    get userName() {
        return this.authService.getUserName();
    }
    get authenticated() {
        return this.authService.isLoggedIn();
    }
}