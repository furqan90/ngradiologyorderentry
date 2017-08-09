import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { AppConfig } from '../../app-config';
import { Observable } from 'rxjs'; 
@Injectable()
export abstract class BasicService {

    webapiURL:string;
    options:RequestOptionsArgs;
    protected methodName;
    private headers:Headers = new Headers();
    private username:string = "admin";
    private password:string = "Admin123";

    constructor(private httpmodule:Http, private appConfiguration:AppConfig)
    {
        this.webapiURL = appConfiguration.getConfig('webApiUrl');
        this.headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
        this.headers.append("Content-Type","application/json");
        this.options = {headers:this.headers, withCredentials:false};
    }

     protected handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
