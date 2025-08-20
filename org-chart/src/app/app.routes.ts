import { Routes } from '@angular/router';
import { OrgChartComponent } from './features/org-chart/org-chart.component';
import { SubtreeComponent } from './features/subtree/subtree.component';

export const routes: Routes = [
    { path: '', component: OrgChartComponent },
    { path: 'employee/:id', component: SubtreeComponent },
    { path: '**', redirectTo: '' }
];
