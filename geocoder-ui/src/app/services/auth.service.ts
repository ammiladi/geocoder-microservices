import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import {  Router,Route, NavigationStart, 
          Event as NavigationEvent, 
          NavigationCancel,
          RoutesRecognized,
          CanActivate,CanActivateChild,CanLoad,
          ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {WindowService}  from './window.service';
import {Session}  from '../model/session';

@Injectable()
export class AuthService implements CanActivate, CanActivateChild, CanLoad {
  
    private session:Session;
    private authConfig ;
    private configObj = {"authEndpoint":"","userInfoUrl":"","clientId":"","callbackUrl":"","scopes" : ""};
    //private token:string;
    private cachedURL:string;
    private loading: boolean;
    private expires: any = 0;
    private userInfo: any = {};
    private windowHandle: any = null;
    private intervalId: any = null;
    private expiresTimerId: any = null;
    private loopCount = 600;
    private intervalLength = 100;


    constructor(private http: Http,private router:Router, private windowService:WindowService ) {
        http.get('config.json')
            .map(response => response.json())
            .subscribe(result => this.authConfig =result);

      /* this.router.events.forEach((event: NavigationEvent) => {
            if(event instanceof RoutesRecognized) {
                let params = new URLSearchParams(event.url.split('?')[1]);
             }
          });    */     
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url;
      let isLogged = this.isLoggedIn();
      if(!isLogged) {
            localStorage.setItem('cachedurl',url);
            this.router.navigate(['/login']);
       }
      return isLogged;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url =  "/${route.path}";
        let isLogged = this.isLoggedIn();
        if(!isLogged) {
            localStorage.setItem('cachedurl',url);
            this.router.navigate(['/login']);
         }
        return isLogged;
    }
   

    logout(): void {
      localStorage.removeItem('session');
      this.router.navigate(['/login']);
    }

    public isLoggedIn(): boolean {
      this.session = JSON.parse(localStorage.getItem('session'));  
      let authenticated = false;
      if(this.session && this.session.authenticated) authenticated = true;
      return authenticated;
    }

    
    public getUserName(): string {
      this.session = JSON.parse(localStorage.getItem('session'));  
      if(this.session) return this.session.userInfo.username;
      else return null;
    }
    public authenticate(provider:string):void{

        if(provider == "oauth2GeocoderProvider" && !this.isLoggedIn()){
           this.configObj = this.authConfig.oauth2GeocoderProvider;
           localStorage.setItem("authConfig",JSON.stringify(this.configObj));        
           let url = this.configObj.authEndpoint+'?client_id='+this.configObj.clientId+'&username='+'username'+'&password='+'pwdpwd'+'&response_type=token&grant_type=password';
           var headers = new Headers();
           this.http.post(url,null)
            .map(response => response.json())
            .subscribe(result => {
              var expiresSeconds = Number(result.expires_in) || 1800;
              this.startExpiresTimer(expiresSeconds);
              this.authConfig =result;
              this.session = new Session();
              this.session.token = result.access_token;
              this.session.authenticated = true;
              this.session.userInfo = this.fetchUserInfo(result.access_token);
              localStorage.setItem('session', JSON.stringify(this.session));
              let cachedurl= localStorage.getItem('cachedurl')
              if(cachedurl){
                this.router.navigate(['/home']);
              }else{
                this.router.navigate(['/home']);
              }
            }, err => {
                    console.error("Failed authentication:", err);
                }
              //{"access_token":"e80b18e3-bb1d-4050-9c15-8e58a9422784","token_type":"bearer","refresh_token":"81b0e461-57ee-4447-850b-3fb44d522340","expires_in":43199,"scope":"ui"}
            );
        return ;

        }  

        if(provider == "linkedinProvider" && !this.isLoggedIn()){
            this.configObj = this.authConfig.linkedinProvider;
            localStorage.setItem("authConfig",JSON.stringify(this.configObj));
            //let url = this.authConfig.linkedinProvider.authEndpoint+'?client_id='+this.authConfig.linkedinProvider.clientId+'&redirect_uri='+this.authConfig.linkedinProvider.callbackUrl+'&response_type=code';
        }
        if(provider == "facebookProvider" && !this.isLoggedIn()){ 
            this.configObj = this.authConfig.facebookProvider;
            localStorage.setItem("authConfig",JSON.stringify(this.configObj));
            //let url = this.authConfig.facebookProvider.authEndpoint+'?client_id=' +this.authConfig.facebookProvider.clientId+'&redirect_uri='+this.authConfig.facebookProvider.callbackUrl+'&scope=email';
        }
        if(provider == "googleProvider" && !this.isLoggedIn()){ 
            this.configObj = this.authConfig.googleProvider;
            localStorage.setItem("authConfig",JSON.stringify(this.configObj));
        }
        
        let url = this.configObj.authEndpoint+'?client_id='+this.configObj.clientId+'&redirect_uri='+this.configObj.callbackUrl+'&response_type=token&approval_prompt=force&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=%2Fprofile';
      
        var loopCount = this.loopCount;
        this.windowHandle = this.windowService.createWindow(url, 'OAuth2 Login');
        this.intervalId = setInterval(() => {
          if(loopCount-- < 0) {
              clearInterval(this.intervalId);
              this.windowHandle.close();
          } else {
              var href: string;
              try {
                  href = this.windowHandle.location.href;} 
              catch (e) { }
              if (href != null) {
                  var re = /access_token=(.*)/;
                  var found = href.match(re);
                  if (found) {
                      console.log("Callback URL:", href);
                      clearInterval(this.intervalId);
                      var parsed = this.parse(href.substr(this.configObj.callbackUrl.length + 1));
                      var expiresSeconds = Number(parsed.expires_in) || 1800;
                      let token = parsed.access_token;
                      if (token) {
                          this.startExpiresTimer(expiresSeconds);
                          this.session = new Session();
                          this.session.token = token;
                          this.session.authenticated = true;                          debugger;
                          this.session.userInfo = this.fetchUserInfo(token);
                          localStorage.setItem('session', JSON.stringify(this.session));
                          this.windowHandle.close();
                          let cachedurl= localStorage.getItem('cachedurl')
                          if(cachedurl){
                            this.router.navigate([cachedurl]);
                          }else{
                            this.router.navigate(['/home']);
                          }
                      } else {
                          this.session.token =  null;
                          this.session.authenticated = false;
                          this.session.expireDate = null;
                          this.session.userInfo = null;
                          localStorage.setItem('session', JSON.stringify(this.session));
                      }

                  } else {
                      if (href.indexOf(this.configObj.callbackUrl) == 0) {
                          clearInterval(this.intervalId);
                          var parsed = this.parse(href.substr(this.configObj.callbackUrl.length + 1));
                          this.windowHandle.close();
                          this.session.token =  null;
                          this.session.authenticated = false;
                          this.session.expireDate = null;
                          this.session.userInfo = null;
                          localStorage.setItem('session', JSON.stringify(this.session));
                      }
                  }
              }
          }
        }, this.intervalLength);

       
    }




    private fetchUserInfo(token) {
    debugger;
        if (token != null) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            this.http.get(this.configObj.userInfoUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(info => {
                    this.userInfo = info;
                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }
    /**
      Helper parse
    **/
    private parse(str) {
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }

        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    };


     private startExpiresTimer(seconds: number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.logout()
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for', seconds, "seconds");
    }

    

}