import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BasicService } from './basic.service';
import { Observable } from 'rxjs/Observable';
import { AppSessionService } from './app-session.service';
import { AppConstantsService } from './app-constants.service';
import { Person } from '../persistence/person';
import { AppConfig } from '../../app-config';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class PersonService extends BasicService {

    constructor(
        private http: Http,
        private appSessionService: AppSessionService,
        private appConstantsService: AppConstantsService,
        private appConfig: AppConfig) {
        super(http, appConfig);
        this.methodName = "person";
    }
    //search Person
    searchPerson(personName: string): Observable<Person> {
        const url = `${this.webapiURL}/person?q=${personName}`;
        return this.http.get(url, this.options).map(
            res => res.json());
    }
    //Create Person
    createPerson(person: Person): Observable<Person> {
    return this.http.post(`${this.webapiURL}person`, JSON.stringify(person), this.options)
      .map(res => res.json() as Person)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

    //updatePerson
    updatePerson(person: Person): Observable<Person> {
        const url = `${this.webapiURL}person/${person.uuid}`;
        return this.http.post(url, JSON.stringify(person), this.options)
            .map(res => res.json() as Person)
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

}
