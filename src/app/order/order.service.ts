import { Injectable } from '@angular/core';
import { BasicService } from "../shared/services/basic.service";
import { Http } from '@angular/http';
import { AppConfig } from '../app-config';
import { Observable } from 'rxjs';
import { Order } from './order';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

@Injectable()
export class OrderService extends BasicService{

  constructor(private http:Http, private appConfig:AppConfig) {
    super(http,appConfig);
    this.methodName = 'order';
  }

  public getOrdersByPatientUUID(uuid:string): Observable<any[]>
  {
    if(uuid === '0')
      return Observable.of([]);
    
    return this.http.get(`${this.webapiURL}${this.methodName}?patient=${uuid}&v=full`,this.options)
    .map(res=>res.json().results as any[])
    .do(data=>console.log(`Orders Get: ${JSON.stringify(data)}`))
    .catch(this.handleError);
  }

  public getOrderByUUID(uuid:string):Observable<any>
  {
    if(!uuid)
      return Observable.of(null);

    return this.http.get(`${this.webapiURL}${this.methodName}/${uuid}?v=full`,this.options)
    .map(res=>res.json() as any)
    .do(data=>console.log(JSON.stringify(data)))
    .catch(this.handleError);
  }

}
