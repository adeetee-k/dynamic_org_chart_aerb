export interface Employee {
    id: string;
    name: string;
    designation: string; // e.g., Chairperson, Director, Head, Manager, Staff
    promotionDate: string; // ISO date string for simplicity
    dateOfBirth: string; // ISO date for secondary sort
    photoUrl?: string; // can be empty string
    managerId?: string; // undefined for top-level (chairperson)
}

export type EmployeeById = { [employeeId: string]: Employee };
