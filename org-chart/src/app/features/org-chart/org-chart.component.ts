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
    private orgService = inject(OrgDataService);

    chairpersons = signal<Employee[]>([]);
    directorsByChair = signal<Record<string, Employee[]>>({});
    headsByDirector = signal<Record<string, Employee[]>>({});
    legendOpen = signal<boolean>(false);

    ngOnInit(): void {
        const top = this.orgService.getTop();
        this.chairpersons.set(top);
        const directorsByChair: Record<string, Employee[]> = {};
        const headsByDirector: Record<string, Employee[]> = {};
        top.forEach(chair => {
            const directors = this.orgService.getDirectReports(chair.id);
            directorsByChair[chair.id] = directors;
            directors.forEach(d => {
                headsByDirector[d.id] = this.orgService.getDirectReports(d.id);
            });
        });
        this.directorsByChair.set(directorsByChair);
        this.headsByDirector.set(headsByDirector);
    }

    toggleLegend(): void {
        this.legendOpen.update(v => !v);
    }

    
}
