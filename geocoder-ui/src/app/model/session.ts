export class Session {
    //private isLoggedin
    public authenticated:boolean;
    public token:string;
    public expireDate: any = 0;
    public userInfo: any = {};

    /*get authenticated():boolean{
		return this.authenticated;
	}
		
	set authenticated(x:boolean){
		this.authenticated = x;
	}

    get token():string{
		return this.token;
	}
		
	set token(x:string){
		this.token = x;
	}

    get userInfo():any {
		return this.userInfo;
	}
		
	set userInfo(x:any ){
		this.userInfo = x;
	}

     get expireDate():any {
		return this.expireDate;
	}
		
	set expireDate(x:any ){
		this.expireDate = x;
	}*/


}