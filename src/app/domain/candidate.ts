import { StoredEntity } from './stored-entity';
import { Attachment } from './attachment';

export class Candidate extends StoredEntity {
    id: number;
    firstName: string;
    lastName: string;
    telephone: string;
    skype: string;
    mail: string;
    description: string;
    attachments: Attachment[];
}
