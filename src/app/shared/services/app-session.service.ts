import { Injectable } from '@angular/core';
import { Location } from '../persistence/location';
import { AppConfig } from '../../app-config';

@Injectable()
export class AppSessionService {

  location:Location;
 
  constructor(private appConfig: AppConfig) 
  {
    this.location = this.appConfig.getConfig('defaultLocation');
  }


}
