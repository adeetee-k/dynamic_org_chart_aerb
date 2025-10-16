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
    csvImportOpen = signal<boolean>(false);

    ngOnInit(): void {
        this.loadOrgData();
    }

    private loadOrgData(): void {
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

    toggleCSVImport(): void {
        this.csvImportOpen.update(v => !v);
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const csvData = e.target.result;
                this.orgService.loadFromCSV(csvData);
                this.loadOrgData(); // Reload the org chart
                this.csvImportOpen.set(false);
            };
            reader.readAsText(file);
        }
    }

    exportToCSV(): void {
        const csvData = this.orgService.exportToCSV();
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'org-chart-data.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
