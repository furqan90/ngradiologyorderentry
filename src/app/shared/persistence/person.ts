import { Record } from './record';

export class Name {
    givenName: string;
    middleName: string;
    familyName: string;
    constructor() {
        this.givenName = "";
        this.middleName = "";
        this.familyName = "";
    }
}
export class Attribute {
    constructor()
    {
        this.attributeType = "";
        this.value = "";
    }
    attributeType: string;
    value: string;
}

export class Address {
    constructor() {
        this.cityVillage = "";
        this.country = "";
        this.address1 = "";
        this.address2 = "";
        this.postalCode = "";
        this.stateProvince = "";
    }
    country: string;
    countyDistrict: string;
    postalCode: string;
    address2: string;
    address1: string;
    stateProvince: string;
    cityVillage: string;
}
export class Person extends Record {
    constructor() {
        super();
        this.names = [new Name()];
        this.addresses = [new Address()];
        this.birthdate = null;
        this.gender = "";
        this.attributes = [];
    }
    names: Name[];
    gender: string;
    birthdate: string;
    addresses: Address[];
    attributes: Attribute[];
}