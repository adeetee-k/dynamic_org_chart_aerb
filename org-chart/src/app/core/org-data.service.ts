import { Injectable } from '@angular/core';
import { Employee, EmployeeById } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class OrgDataService {
    private employees: Employee[] = [
        // Chairperson
        { id: 'e1', name: 'Name1', designation: 'Chairperson', promotionDate: '2015-01-15', dateOfBirth: '1965-03-10', photoUrl: '' },
        // Directors (3)
        { id: 'e2', name: 'Name2', designation: 'Director', promotionDate: '2016-03-12', dateOfBirth: '1972-07-22', photoUrl: '', managerId: 'e1' },
        { id: 'e3', name: 'Name3', designation: 'Director', promotionDate: '2017-05-20', dateOfBirth: '1974-01-09', photoUrl: '', managerId: 'e1' },
        { id: 'e4', name: 'Name4', designation: 'Director', promotionDate: '2018-11-02', dateOfBirth: '1970-12-01', photoUrl: '', managerId: 'e1' },
        // Level 3: Heads/CAO/DCA under directors
        { id: 'h21', name: 'Name5', designation: 'Head', promotionDate: '2019-01-01', dateOfBirth: '1980-02-02', photoUrl: '', managerId: 'e2' },
        { id: 'h22', name: 'Name6', designation: 'Head', promotionDate: '2019-02-10', dateOfBirth: '1982-05-06', photoUrl: '', managerId: 'e2' },
        { id: 'h23', name: 'Name7', designation: 'Head', promotionDate: '2019-03-12', dateOfBirth: '1981-08-11', photoUrl: '', managerId: 'e2' },
        { id: 'h24', name: 'Name8', designation: 'Head', promotionDate: '2019-04-15', dateOfBirth: '1983-10-30', photoUrl: '', managerId: 'e2' },
        { id: 'h31', name: 'Name9', designation: 'Head', promotionDate: '2018-04-15', dateOfBirth: '1980-03-03', photoUrl: '', managerId: 'e3' },
        { id: 'cao32', name: 'Name10', designation: 'CAO', promotionDate: '2018-06-20', dateOfBirth: '1981-04-04', photoUrl: '', managerId: 'e3' },
        { id: 'h33', name: 'Name11', designation: 'Head', promotionDate: '2018-07-10', dateOfBirth: '1982-05-05', photoUrl: '', managerId: 'e3' },
        { id: 'dca34', name: 'Name12', designation: 'DCA', promotionDate: '2018-08-01', dateOfBirth: '1983-06-06', photoUrl: '', managerId: 'e3' },
        { id: 'h35', name: 'Name13', designation: 'Head', promotionDate: '2018-09-09', dateOfBirth: '1984-07-07', photoUrl: '', managerId: 'e3' },
        { id: 'h41', name: 'Name14', designation: 'Head', promotionDate: '2020-07-30', dateOfBirth: '1980-08-08', photoUrl: '', managerId: 'e4' },
        { id: 'h42', name: 'Name15', designation: 'Head', promotionDate: '2020-08-15', dateOfBirth: '1981-09-09', photoUrl: '', managerId: 'e4' },
        { id: 'cao43', name: 'Name16', designation: 'CAO', promotionDate: '2020-09-01', dateOfBirth: '1982-10-10', photoUrl: '', managerId: 'e4' },
        { id: 'dca44', name: 'Name17', designation: 'DCA', promotionDate: '2020-10-10', dateOfBirth: '1983-11-11', photoUrl: '', managerId: 'e4' },

        // Personal Assistants
        { id: 'pa1', name: 'PA1', designation: 'PA', promotionDate: '2015-02-01', dateOfBirth: '1985-01-15', photoUrl: '', managerId: 'e1' },
        { id: 'pa2', name: 'PA2', designation: 'PA', promotionDate: '2015-03-01', dateOfBirth: '1986-02-20', photoUrl: '', managerId: 'e1' },
        { id: 'pa3', name: 'PA3', designation: 'PA', promotionDate: '2016-04-01', dateOfBirth: '1987-03-10', photoUrl: '', managerId: 'e2' },
        { id: 'pa4', name: 'PA4', designation: 'PA', promotionDate: '2016-05-01', dateOfBirth: '1988-04-05', photoUrl: '', managerId: 'e3' },
        { id: 'pa5', name: 'PA5', designation: 'PA', promotionDate: '2016-06-01', dateOfBirth: '1989-05-12', photoUrl: '', managerId: 'e4' },
        { id: 'pa6', name: 'PA6', designation: 'PA', promotionDate: '2016-07-01', dateOfBirth: '1990-06-18', photoUrl: '', managerId: 'h21' },
        { id: 'pa7', name: 'PA7', designation: 'PA', promotionDate: '2016-08-01', dateOfBirth: '1991-07-25', photoUrl: '', managerId: 'h22' },
        { id: 'pa8', name: 'PA8', designation: 'PA', promotionDate: '2016-09-01', dateOfBirth: '1992-08-30', photoUrl: '', managerId: 'h23' },
        { id: 'pa9', name: 'PA9', designation: 'PA', promotionDate: '2016-10-01', dateOfBirth: '1993-09-14', photoUrl: '', managerId: 'h24' },
        { id: 'pa10', name: 'PA10', designation: 'PA', promotionDate: '2016-11-01', dateOfBirth: '1994-10-22', photoUrl: '', managerId: 'h31' },
        { id: 'pa11', name: 'PA11', designation: 'PA', promotionDate: '2016-12-01', dateOfBirth: '1995-11-08', photoUrl: '', managerId: 'cao32' },
        { id: 'pa12', name: 'PA12', designation: 'PA', promotionDate: '2017-01-01', dateOfBirth: '1996-12-03', photoUrl: '', managerId: 'h33' },
        { id: 'pa13', name: 'PA13', designation: 'PA', promotionDate: '2017-02-01', dateOfBirth: '1997-01-17', photoUrl: '', managerId: 'dca34' },
        { id: 'pa14', name: 'PA14', designation: 'PA', promotionDate: '2017-03-01', dateOfBirth: '1998-02-28', photoUrl: '', managerId: 'h35' },
        { id: 'pa15', name: 'PA15', designation: 'PA', promotionDate: '2017-04-01', dateOfBirth: '1999-03-11', photoUrl: '', managerId: 'h41' },
        { id: 'pa16', name: 'PA16', designation: 'PA', promotionDate: '2017-05-01', dateOfBirth: '2000-04-19', photoUrl: '', managerId: 'h42' },
        { id: 'pa17', name: 'PA17', designation: 'PA', promotionDate: '2017-06-01', dateOfBirth: '2001-05-26', photoUrl: '', managerId: 'cao43' },
        { id: 'pa18', name: 'PA18', designation: 'PA', promotionDate: '2017-07-01', dateOfBirth: '2002-06-07', photoUrl: '', managerId: 'dca44' },
        { id: 'pa19', name: 'PA19', designation: 'PA', promotionDate: '2017-08-01', dateOfBirth: '2003-07-13', photoUrl: '', managerId: 'h21' },
        { id: 'pa20', name: 'PA20', designation: 'PA', promotionDate: '2017-09-01', dateOfBirth: '2004-08-21', photoUrl: '', managerId: 'h22' },

        // Deeper levels will be auto-completed below
    ];

    private designationRank: Record<string, number> = {
        Chairperson: 1,
        Director: 2,
        Head: 3,
        CAO: 3,
        DCA: 3,
        PA: 11, // PAs are at the bottom of the hierarchy
        'Section Head': 4,
        SOF: 5,
        SOE: 6,
        SOD: 7,
        SOC: 8,
        Manager: 9,
        Staff: 10
    };

    private idCounter = 1000;

    constructor() {
        // Ensure minimum hierarchical children exist for all level-3 roles
        this.ensureMinimumHierarchy();
        // PAs are now properly assigned via managerId in the data structure
    }

    getAll(): Employee[] {
        return [...this.employees];
    }

    getById(id: string): Employee | undefined {
        return this.employees.find(e => e.id === id);
    }

    getDirectReports(managerId: string): Employee[] {
        return this.sortEmployees(this.employees.filter(e => e.managerId === managerId && e.designation !== 'PA'));
    }

    getTop(): Employee[] {
        // No managerId => top of org (usually one chairperson)
        return this.sortEmployees(this.employees.filter(e => !e.managerId));
    }

    getPersonalAssistants(employeeId: string): Employee[] {
        // Find all PAs that report to this employee
        return this.employees.filter(e => e.managerId === employeeId && e.designation === 'PA');
    }

    getDesignationRank(designation: string): number {
        return this.designationRank[designation] ?? Number.MAX_SAFE_INTEGER;
    }

    sortEmployees(list: Employee[]): Employee[] {
        return [...list].sort((a, b) => {
            const rankDiff = this.getDesignationRank(a.designation) - this.getDesignationRank(b.designation);
            if (rankDiff !== 0) return rankDiff;
            const promoDiff = new Date(a.promotionDate).getTime() - new Date(b.promotionDate).getTime();
            if (promoDiff !== 0) return promoDiff;
            const dobDiff = new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime();
            if (dobDiff !== 0) return dobDiff;
            return a.name.localeCompare(b.name);
        });
    }

    private ensureMinimumHierarchy(): void {
        const level3Roles = new Set(['Head', 'CAO', 'DCA']);
        // For each Head/CAO/DCA ensure at least 2 Section Heads
        this.employees
            .filter(e => level3Roles.has(e.designation))
            .forEach(h => this.ensureChildren(h.id, 'Section Head', 2));

        // For each Section Head ensure 2 SOF
        this.employees
            .filter(e => e.designation === 'Section Head')
            .forEach(s => this.ensureChildren(s.id, 'SOF', 2));

        // For each SOF ensure 2 SOE
        this.employees
            .filter(e => e.designation === 'SOF')
            .forEach(s => this.ensureChildren(s.id, 'SOE', 2));

        // For each SOE ensure 2 SOD
        this.employees
            .filter(e => e.designation === 'SOE')
            .forEach(s => this.ensureChildren(s.id, 'SOD', 2));

        // For each SOD ensure 2 SOC
        this.employees
            .filter(e => e.designation === 'SOD')
            .forEach(s => this.ensureChildren(s.id, 'SOC', 2));
    }

    private ensureChildren(managerId: string, designation: string, minCount: number): void {
        const children = this.employees.filter(e => e.managerId === managerId && e.designation === designation);
        const toAdd = Math.max(0, minCount - children.length);
        for (let i = 0; i < toAdd; i++) {
            this.employees.push(this.generateEmployee(managerId, designation));
        }
    }

    private generateEmployee(managerId: string, designation: string): Employee {
        const id = `g${this.idCounter++}`;
        const name = `Name${this.idCounter}`;
        const year = 1980 + (this.idCounter % 30);
        const month = (this.idCounter % 12) + 1;
        const day = (this.idCounter % 28) + 1;
        const promoYear = 2019 + (this.idCounter % 5);
        const promoMonth = ((this.idCounter + 3) % 12) + 1;
        const promoDay = ((this.idCounter + 7) % 28) + 1;
        return {
            id,
            name,
            designation,
            promotionDate: `${promoYear.toString().padStart(4, '0')}-${promoMonth.toString().padStart(2, '0')}-${promoDay.toString().padStart(2, '0')}`,
            dateOfBirth: `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            photoUrl: '',
            managerId
        };
    }

    private assignPersonalAssistants(): void {
        // PAs are now properly assigned via managerId in the data structure
        // This method is kept for backward compatibility but no longer needed
        // The getPersonalAssistants method will work with the managerId relationships
    }
}
