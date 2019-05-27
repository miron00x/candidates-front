import { Candidate } from './candidate';
import { Employee } from './employee';

export class Interview {
    id: number;
    candidate: Candidate;
    interviewDateTime: Date;
    status: String;
    employees: Employee[];
}
