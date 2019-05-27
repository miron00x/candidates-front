import { StoredEntity } from './stored-entity';

export class Attachment extends StoredEntity {
    id: number;
    candidateId: string;
    fileName: string;
    path: string;
}
