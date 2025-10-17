import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrgDataService } from '../../core/org-data.service';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-org-chart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './org-chart.component.html',
  styleUrl: './org-chart.component.scss'
})
export class OrgChartComponent implements OnInit {
    org = inject(OrgDataService);

    chairpersons = signal<Employee[]>([]);
    directorsByChair = signal<Record<string, Employee[]>>({});
    headsByDirector = signal<Record<string, Employee[]>>({});
    legendOpen = signal<boolean>(false);

    ngOnInit(): void {
        this.loadOrgData();
    }

    private loadOrgData(): void {
        const top = this.org.getTop();
        this.chairpersons.set(top);
        const directorsByChair: Record<string, Employee[]> = {};
        const headsByDirector: Record<string, Employee[]> = {};
        top.forEach(chair => {
            const directors = this.org.getDirectReports(chair.id);
            directorsByChair[chair.id] = directors;
            directors.forEach(d => {
                headsByDirector[d.id] = this.org.getDirectReports(d.id);
            });
        });
        this.directorsByChair.set(directorsByChair);
        this.headsByDirector.set(headsByDirector);
    }

    getSectionHeadsFor(managerId: string) {
        return this.org.getSectionHeads(managerId);
    }

    getDeeperDescendantsFor(managerId: string) {
        return this.org.getDeeperDescendants(managerId);
    }

    toggleLegend(): void {
        this.legendOpen.update(v => !v);
    }

}
