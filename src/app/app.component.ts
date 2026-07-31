import { Component, inject} from '@angular/core';
import { ShotScatterComponent } from './shot-scatter/shot-scatter.component';
import {ShotDataService} from "./services/shot-data.service";
import { ScatterFiltersComponent } from './scatter-filters/scatter-filters.component';
import { SummaryTableComponent } from './summary-table/summary-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShotScatterComponent, ScatterFiltersComponent, SummaryTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}