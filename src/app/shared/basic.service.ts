import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { AppConfig } from '../app.config';

@Injectable()
export abstract class BasicService {

    webapiURL:string;
    options:RequestOptionsArgs;
    protected methodName;
    private headers:Headers = new Headers();
    private username:string = "admin";
    private password:string = "Admin123";

    constructor(private httpmodule:Http, private appConfig:AppConfig)
    {
        this.webapiURL = appConfig.getConfig('webApiUrl');
        this.headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
        this.headers.append("Content-Type","application/json");
        this.options = {headers:this.headers, withCredentials:false};
    }


}
