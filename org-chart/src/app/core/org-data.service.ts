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

        // Deeper levels will be auto-completed below
    ];

    private designationRank: Record<string, number> = {
        Chairperson: 1,
        Director: 2,
        Head: 3,
        CAO: 3,
        DCA: 3,
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
    }

    getAll(): Employee[] {
        return [...this.employees];
    }

    getById(id: string): Employee | undefined {
        return this.employees.find(e => e.id === id);
    }

    getDirectReports(managerId: string): Employee[] {
        return this.sortEmployees(this.employees.filter(e => e.managerId === managerId));
    }

    getTop(): Employee[] {
        // No managerId => top of org (usually one chairperson)
        return this.sortEmployees(this.employees.filter(e => !e.managerId));
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
}
