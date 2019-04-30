import { StoredEntity } from './stored-entity';

export class Candidate extends StoredEntity {
    id: number;
    firstName: string;
    lastName: string;
    telephone: string;
    skype: string;
    mail: string;
    description: string;
}
