import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BasicService } from './basic.service';
import { Person, Attribute, Address } from '../persistence/person';
import { Patient } from '../persistence/patient';
import { Observable } from 'rxjs/Observable';
import { AppSessionService } from './app-session.service';
import { AppConstantsService } from './app-constants.service';
import { AppConfig } from '../../app-config';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class PatientService extends BasicService {

  constructor(
    private http: Http,
    private appSessionService: AppSessionService,
    private appConstantsService: AppConstantsService,
    private appConfig: AppConfig) {
    super(http, appConfig);
    this.methodName = "patient";
  }

  getIdentifier(): Observable<any> {
    return this.http.get(this.appConstantsService.idgenUrl)
      .map(res => res.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  createPatient(person: Person, identifier): Observable<Patient> {
    return this.http.post(`${this.webapiURL}${this.methodName}`,
      {
        person: person.uuid,
        identifiers:
        [
          {
            identifierType: this.appConstantsService.identifierType,
            location: this.appSessionService.location.uuid,
            identifier: identifier
          }
        ]
      }, this.options)
      .map(res => res.json() as Patient)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  // 7/25/2017
  getPatient(uuid: string): Observable<Patient> {

    if (uuid === '0') {
      return Observable.of(this.createNewPatient());
    }
    const url: string = `${this.webapiURL}${this.methodName}/${uuid}?v=full`;
    console.log(url);

    return this.http.get(url, this.options)
      .map(res => res.json())
      .do(data => console.log('getPatient: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPatients(limit:number, startIndex:number):Observable<Patient[]>
  {
    return this.http.get(`${this.webapiURL}${this.methodName}?limit=${limit}&startIndex=${startIndex}`)
    .map(res=>res.json() as Patient[])
    .do(data=>console.log('patients '+JSON.stringify(data)))
    .catch(this.handleError);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.post(`${this.webapiURL}${this.methodName}/${patient.uuid}`, JSON.stringify(patient), this.options)
      .map(res => res.json() as Patient)
      .do(data => console.log('updatePatient ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  searchPatient(term: string): Observable<Patient[]> {
    if (!term) {
      return Observable.of<Patient[]>([]);
    }
    const search_patient_url = `${this.webapiURL}${this.methodName}?q=${term}&v=full`;
    console.log(search_patient_url);
    return this.http.get(search_patient_url, this.options)
      .map(response => response.json().results as Patient[])
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }
  
  private createNewPatient():Patient
  {
    let patient:Patient = new Patient();
    patient.person.addresses = [new Address()];
    let phoneNumberAttr = new Attribute();
    phoneNumberAttr.attributeType = this.appConfig.getConfig('phoneNumberAttributeUUID');
    patient.person.attributes = [phoneNumberAttr];
    return patient;
  }
}


