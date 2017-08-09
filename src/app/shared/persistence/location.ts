import { Record } from './record';

export interface Location extends Record
{

     name:string;
     description:string;
     address1:string;
     address2:string;
     cityVillage:string;
     stateProvince:string;
     country:string;
     postalCode:string;
     latitude:string;
     longitude:string;
     countyDistrict:string;
     address3:string;
     address4:string;
     address5:string;
     address6:string;
}
