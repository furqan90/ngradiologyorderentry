import { Person } from './person';
import { Record } from './record';
class identifier
{
  identifier: string;
  location: string;
  identifierType: string;
  preferred: string;

}
export class Patient extends Record {
      constructor() {
            super();
            this.person = new Person();
      }
      uuid: string;
      person: Person;
      identifiers: identifier[];
      

}
