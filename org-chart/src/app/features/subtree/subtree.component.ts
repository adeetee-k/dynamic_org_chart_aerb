import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrgDataService } from '../../core/org-data.service';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-subtree',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subtree.component.html',
  styleUrl: './subtree.component.scss'
})
export class SubtreeComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private orgService = inject(OrgDataService);

    root = signal<Employee | undefined>(undefined);
    children = signal<Employee[]>([]);
    grandchildrenByChild = signal<Record<string, Employee[]>>({});
    showOnlyDirectors = signal<boolean>(false);

    ngOnInit(): void {
        // React to param changes when navigating to the same component with a new :id
        this.route.paramMap.subscribe(params => {
            const id = params.get('id') ?? '';
            this.loadSubtree(id);
        });
    }

    private loadSubtree(id: string): void {
        const employee = this.orgService.getById(id);
        this.root.set(employee);
        if (!employee) {
            this.children.set([]);
            this.grandchildrenByChild.set({});
            return;
        }

        // Check if this is a chairperson - if so, show only directors
        this.showOnlyDirectors.set(employee.designation === 'Chairperson');

        const kids = this.orgService.getDirectReports(employee.id);
        this.children.set(kids);
        
        // Only load grandchildren if not showing only directors
        if (!this.showOnlyDirectors()) {
            const map: Record<string, Employee[]> = {};
            kids.forEach(k => {
                map[k.id] = this.orgService.getDirectReports(k.id);
            });
            this.grandchildrenByChild.set(map);
        } else {
            this.grandchildrenByChild.set({});
        }
    }

    getPersonalAssistants(employeeId: string): Employee[] {
        return this.orgService.getPersonalAssistants(employeeId);
    }
}
