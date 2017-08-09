import { Injectable } from '@angular/core';
import { AppConfig } from '../../app-config';
@Injectable()
export class AppConstantsService {

   identifierType:string;
   idgenUrl:string;

   constructor(private appConfig:AppConfig) 
   {
       this.identifierType = appConfig.getConfig('identifierType');
       this.idgenUrl = appConfig.getConfig('idgenUrl');
    }

}
