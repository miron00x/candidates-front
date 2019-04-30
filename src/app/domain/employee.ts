import { Department } from './department';
import { StoredEntity } from './stored-entity';

export class Employee extends StoredEntity {
    id: number;
	firstName: string;
    lastName: string;
    deleted: boolean;
    department: Department;
}
